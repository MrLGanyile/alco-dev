import 'dart:io';
import 'dart:developer' as debug;

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../models/locations/converter.dart';
import '../models/locations/section_name.dart';
import '../models/locations/supported_area.dart';
import '../models/users/alcoholic.dart';
import 'shared_dao_functions.dart';

enum AlcoholicSavingStatus {
  incompleteData,
  adminAlreadyExist,
  loginRequired,
  unathourized,
  saved,
}

class AlcoholicController extends GetxController {
  static AlcoholicController alcoholicController = Get.find();

  FirebaseFirestore firestore;
  FirebaseFunctions functions;
  Reference storage;
  FirebaseAuth auth;

  AlcoholicController({
    required this.firestore,
    required this.storage,
    required this.functions,
    required this.auth,
  });

  // ignore: prefer_final_fields
  Rx<Alcoholic?> _currentlyLoggedInAlcoholic = Rx(null
      /*Alcoholic(
          userId: 'xHylOxUqu7JZJLTaLsqzmK0pNSX0',
          phoneNumber: '+27612345678',
          profileImageURL:
              'mayville/alcoholics/profile_images/+27612345678.jpg',
          area: SupportedArea.fromJson({
            "townOrInstitutionFK": "5",
            "areaName":
                "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            "areaNo": "31",
          }),
          username: 'Sakhile',
          password: "12abc12")*/
      );
  Alcoholic? get currentlyLoggedInAlcoholic =>
      _currentlyLoggedInAlcoholic.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicPhoneNumber = Rx('');
  String? get newAlcoholicPhoneNumber => _newAlcoholicPhoneNumber.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicUsername = Rx('');
  String? get newAlcoholicUsername => _newAlcoholicUsername.value;

  // ignore: prefer_final_fields
  late Rx<SupportedArea> _newAlcoholicArea = Rx(Converter.toSupportedArea(
      SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica));
  SupportedArea get newAlcoholicArea => _newAlcoholicArea.value;

  late Rx<File?> _newAlcoholicProfileImageFile;
  File? get newAlcoholicProfileImageFile => _newAlcoholicProfileImageFile.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAlcoholicImageURL = Rx('');
  String? get newAlcoholicImageURL => _newAlcoholicImageURL.value;

  // ignore: prefer_final_fields
  late Rx<String> _newAlcoholicPassword = Rx('');
  String get newAlcoholicPassword => _newAlcoholicPassword.value;

  Rx<SectionName?> locateableSectionName =
      Rx<SectionName>(SectionName.dutDurbanKwaZuluNatalSouthAfrica);
  SectionName? get searchedSectionName => locateableSectionName.value;

  void setNewAlcoholicPassword(String password) {
    _newAlcoholicPassword = Rx(password);
  }

  void loginAlcoholic(String uid) async {
    DocumentReference reference = firestore.collection('alcoholics').doc(uid);

    reference.get().then((alcoholicDoc) {
      if (alcoholicDoc.exists) {
        Alcoholic alcoholic = Alcoholic.fromJson(alcoholicDoc.data());
        _currentlyLoggedInAlcoholic = Rx(alcoholic);
        auth.authStateChanges();
        debug.log('${alcoholicDoc.id}[${alcoholic.phoneNumber}] has logged in');
      }
    });
  }

  void loginUserUsingObject(Alcoholic alcoholic) {
    _currentlyLoggedInAlcoholic = Rx(alcoholic);
    auth.authStateChanges();
  }

  void logoutAlcoholic() {
    if (_currentlyLoggedInAlcoholic.value != null) {
      _currentlyLoggedInAlcoholic = Rx(null);
      auth.signOut();
    }
  }

  void captureAlcoholicProfileImageWithCamera(
      String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Capturing An Image.');
      debug.log('Phone Number Is Required Before Capturing An Image.');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Capturing An Image.');
      debug.log('Username Is Required Before Capturing An Image.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        String host = Converter.townOrInstitutionAsString(
                Converter.toSupportedTownOrInstitution(
                        _newAlcoholicArea.value.sectionName)
                    .townOrInstitutionName)
            .toLowerCase();

        if (host.contains('howard college ukzn') &&
            'howard college ukzn'.contains(host)) {
          host = 'ukzn'; // Supposed to be ukzn-howard
        } else if (host.contains('mangosuthu (mut)') &&
            'mangosuthu (mut)'.contains(host)) {
          host = 'mut';
        }
        _newAlcoholicProfileImageFile = Rx<File?>(File(pickedImageFile.path));
        _newAlcoholicImageURL = Rx<String?>(await uploadResource(
            _newAlcoholicProfileImageFile.value!,
            '$host/alcoholics/profile_images/$phoneNumber'));
        _newAlcoholicPhoneNumber = Rx<String?>(phoneNumber);
        _newAlcoholicUsername = Rx<String?>(username);
        debug.log('Image File Successfully Captured.');
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
        debug.log('Image Wasn\'t Captured');
      }
    }
  }

  void chooseAlcoholicProfileImageFromGallery(
      String phoneNumber, String username) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Capturing An Image.');
      debug.log('Phone Number Is Required Before Capturing An Image');
    } else if (username.isEmpty) {
      Get.snackbar('Error', 'Username Is Required Before Capturing An Image.');
      debug.log('Username Is Required Before Capturing An Image');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        _newAlcoholicProfileImageFile = Rx<File?>(File(pickedImageFile.path));
        String host = Converter.townOrInstitutionAsString(
                Converter.toSupportedTownOrInstitution(
                        _newAlcoholicArea.value.sectionName)
                    .townOrInstitutionName)
            .toLowerCase();

        if (host.contains('howard college ukzn') &&
            'howard college ukzn'.contains(host)) {
          host = 'ukzn'; // Supposed to be ukzn-howard
        } else if (host.contains('mangosuthu (mut)') &&
            'mangosuthu (mut)'.contains(host)) {
          host = 'mut';
        }
        _newAlcoholicImageURL = Rx<String?>(await uploadResource(
            _newAlcoholicProfileImageFile.value!,
            '$host/alcoholics/profile_images/$phoneNumber'));
        _newAlcoholicPhoneNumber = Rx<String?>(phoneNumber);
        _newAlcoholicUsername = Rx<String?>(username);
        debug.log('Image File Successfully Captured');
        Get.snackbar('Image Status', 'Image File Successfully Captured.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Captured.');
        debug.log('Image Wasn\'t Captured');
      }
    }
  }

  String trimmedImageURL() {
    String host = Converter.townOrInstitutionAsString(
        Converter.toSupportedTownOrInstitution(newAlcoholicArea.sectionName)
            .townOrInstitutionName);
    return _newAlcoholicImageURL.value!
        .substring(_newAlcoholicImageURL.value!.indexOf('/$host/alcoholics'),
            _newAlcoholicImageURL.value!.indexOf('?'))
        .replaceAll('%2F', '/');
  }

  Stream<List<Alcoholic>> readAlcoholics() {
    return firestore
        .collection(
            'alcoholics') /*
        .where('area.areaNo',
            isEqualTo:
                Converter.toSupportedArea(locateableSectionName.value!).areaNo) */
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Alcoholic alcoholic = Alcoholic.fromJson(doc.data());
              return alcoholic;
            }).toList());
  }

  void setNewAlcoholicArea(String chosenSectionName) {
    _newAlcoholicArea = Rx<SupportedArea>(
        Converter.toSupportedArea(Converter.toSectionName(chosenSectionName)));
    update();
  }

  void setSearchedSectionName(String chosenSectionName) {
    locateableSectionName =
        Rx<SectionName?>(Converter.toSectionName(chosenSectionName));
    update();
  }

  Future<AlcoholicSavingStatus> saveAlcoholic(String uid) async {
    if (newAlcoholicProfileImageFile != null &&
        _newAlcoholicImageURL.value != null &&
        _newAlcoholicPhoneNumber.value != null &&
        _newAlcoholicUsername.value != null) {
      try {
        DocumentReference reference =
            firestore.collection('alcoholics').doc(uid);

        Alcoholic alcoholic = Alcoholic(
            userId: reference.id,
            password: _newAlcoholicPassword.value,
            phoneNumber: _newAlcoholicPhoneNumber.value,
            profileImageURL: trimmedImageURL(),
            username: _newAlcoholicUsername.value!,
            area: _newAlcoholicArea.value);

        await firestore
            .collection('alcoholics')
            .doc(alcoholic.userId!)
            .set(alcoholic.toJson());
        loginUserUsingObject(alcoholic);
        showProgressBar = false;
        return AlcoholicSavingStatus.saved;
      } catch (error) {
        Get.snackbar("Saving Error", "Alcoholic Couldn'\t Be Saved.");
        debug.log(error.toString());
        showProgressBar = false;
        return AlcoholicSavingStatus.unathourized;
      }
    } else {
      return AlcoholicSavingStatus.incompleteData;
    }
  }
}
