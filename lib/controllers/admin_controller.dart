import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';

import '../models/locations/town_or_institution.dart';
import '../models/users/admin.dart';
import '../screens/utils/globals.dart';
import 'shared_dao_functions.dart';
import 'dart:math';
import 'dart:developer' as debug;

enum AdminSavingStatus {
  invalidInput,
  incompleteData,
  adminAlreadyExist,
  loginRequired,
  unathourized,
  saved,
}

class AdminController extends GetxController {
  FirebaseFirestore firestore;
  FirebaseFunctions functions;
  Reference storage;
  FirebaseAuth auth;

  AdminController({
    required this.firestore,
    required this.storage,
    required this.functions,
    required this.auth,
  });

  static AdminController adminController = Get.find();

  // ignore: prefer_final_fields
  Rx<Admin?> _currentlyLoggedInAdmin = Rx(null
      /*Admin(
          phoneNumber: '+27611111111',
          password: 'qwerty321',
          joinedOn: DateTime(2025, 2, 5),
          profileImageURL: 'admins/profile_images/+27611111111.png',
          isFemale: false,
          isSuperior: true,
          key: "000") */
      );
  Admin? get currentlyLoggedInAdmin => _currentlyLoggedInAdmin.value;

  // ignore: prefer_final_fields
  late Rx<File?> _newAdminProfileImage = Rx(null);
  File? get newAdminProfileImage => _newAdminProfileImage.value;

  // ignore: prefer_final_fields
  late Rx<String> _newAdminProfileImageURL = Rx('');
  String get newAdminProfileImageURL => _newAdminProfileImageURL.value;

  // ignore: prefer_final_fields
  late Rx<String?> _newAdminPhoneNumber = Rx(null);
  String? get newAdminPhoneNumber => _newAdminPhoneNumber.value;

  // ignore: prefer_final_fields
  late Rx<TownOrInstitution> _newTownOrInstitutionName =
      Rx(TownOrInstitution.howardUKZN);
  TownOrInstitution get newTownOrInstitutionName =>
      _newTownOrInstitutionName.value;

  // ignore: prefer_final_fields
  late Rx<bool> _newAdminIsFemale = Rx(true);
  bool get newAdminIsFemale => _newAdminIsFemale.value;

  // ignore: prefer_final_fields
  late Rx<String> _newAdminPassword = Rx('');
  String get newAdminPassword => _newAdminPassword.value;

  // ignore: prefer_final_fields
  late Rx<String?> _superiorAdminEntranceCode = Rx<String?>(null);
  String? get superiorAdminEntranceCode => _superiorAdminEntranceCode.value;

  Future<Admin?> findAdmin(String phoneNumber) {
    return firestore.collection('admins').doc(phoneNumber).get().then((value) {
      return value.exists ? Admin.fromJson(value.data()) : null;
    });
  }

  void loginAdminUsingObject(Admin admin) {
    _currentlyLoggedInAdmin = Rx(admin);
    auth.authStateChanges();
  }

  void logoutAdmin() {
    _currentlyLoggedInAdmin = Rx(null);
    auth.signOut();
  }

  void chooseAdminProfileImageFromGallery(String phoneNumber) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Picking An Image.');
    } else if (!isValidPhoneNumber(phoneNumber)) {
      Get.snackbar('Error', 'Phone Number Is Invalid.');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.gallery);

      if (pickedImageFile != null) {
        _newAdminProfileImage = Rx<File?>(File(pickedImageFile.path));
        _newAdminProfileImageURL = Rx<String>(await uploadResource(
            _newAdminProfileImage.value!,
            '/admins/profile_images/$phoneNumber'));
        _newAdminPhoneNumber = Rx<String?>(phoneNumber);
        Get.snackbar('Image Status', 'Image File Successfully Picked.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Picked.');
      }
    }
  }

  void captureAdminProfileImageWithCamera(String phoneNumber) async {
    if (phoneNumber.isEmpty) {
      Get.snackbar(
          'Error', 'Phone Number Is Required Before Picking An Image.');
      debug.log('Phone Number Is Required Before Picking An Image.');
    } else if (!isValidPhoneNumber(phoneNumber)) {
      Get.snackbar('Error', 'Phone Number Is Invalid.');
      debug.log('Phone Number Is Invalid');
    } else {
      final pickedImageFile =
          await ImagePicker().pickImage(source: ImageSource.camera);

      if (pickedImageFile != null) {
        _newAdminProfileImage = Rx<File?>(File(pickedImageFile.path));
        _newAdminProfileImageURL = Rx<String>(await uploadResource(
            _newAdminProfileImage.value!,
            '/admins/profile_images/$phoneNumber'));
        _newAdminPhoneNumber = Rx<String?>(phoneNumber);

        debug.log('Image File Successfully Picked');
        Get.snackbar('Image Status', 'Image File Successfully Picked.');
        update();
      } else {
        Get.snackbar('Error', 'Image Wasn\'t Picked.');
        debug.log('Image Wasn\'t Picked.');
      }
    }
  }

  void setAdminPassword(String password) {
    _newAdminPassword = Rx(password);
  }

  void setNewTownOrInstitutionName(TownOrInstitution townOrInstitutionName) {
    _newTownOrInstitutionName = Rx<TownOrInstitution>(townOrInstitutionName);
    update();
  }

  void setNewAdminIsFemale(bool isFemale) {
    _newAdminIsFemale = Rx<bool>(isFemale);
    update();
  }

  bool isCorrectSuperiorAdminEntrancePassword() {
    return _superiorAdminEntranceCode.value != null &&
        _superiorAdminEntranceCode.value!.contains('QAZwsxedc321@') &&
        'QAZwsxedc321@'.contains(_superiorAdminEntranceCode.value!);
  }

  void setSuperiorAdminEntranceCode(String superiorAdminEntranceCode) {
    if (superiorAdminEntranceCode.contains('QAZwsxedc321@') &&
        'QAZwsxedc321@'.contains(superiorAdminEntranceCode)) {
      _superiorAdminEntranceCode = Rx<String?>(superiorAdminEntranceCode);
      update();
    }
  }

  Stream<List<Admin>> readAdmins() {
    Stream<List<Admin>> stream = firestore
        .collection(
            'admins') /*
        .where('townOrInstitution',
            isEqualTo:
                Converter.townOrInstitutionAsString(newTownOrInstitutionName)) */
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              Admin admin = Admin.fromJson(doc.data());
              return admin;
            }).toList());

    return stream;
  }

  Future<AdminSavingStatus> saveAdmin(String phoneNumber) async {
    DocumentReference adminReference =
        firestore.collection('admins').doc(phoneNumber);

    return adminReference
        .snapshots()
        .map((adminDoc) async {
          if (currentlyLoggedInAdmin == null) {
            return AdminSavingStatus.loginRequired;
          }

          if (_newAdminPhoneNumber.value != null &&
              (!isValidPhoneNumber(_newAdminPhoneNumber.value!) ||
                  newAdminPassword.isEmpty)) {
            return AdminSavingStatus.invalidInput;
          }

          if (!(currentlyLoggedInAdmin as Admin).isSuperior) {
            return AdminSavingStatus.unathourized;
          }

          if (_newAdminProfileImage.value == null ||
              _newAdminProfileImageURL.value.isEmpty ||
              _newAdminPhoneNumber.value == null) {
            return AdminSavingStatus.incompleteData;
          }

          if (!adminDoc.exists) {
            String characters =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            Random random = Random();
            DateTime joinedOn = DateTime.now();

            String key = '';
            key += characters[random.nextInt(characters.length)];
            key += characters[random.nextInt(characters.length)];
            key += characters[random.nextInt(characters.length)];

            Admin admin = Admin(
              joinedOn: joinedOn,
              phoneNumber: _newAdminPhoneNumber.value,
              profileImageURL: _newAdminProfileImageURL.value,
              key: key,
              isFemale: _newAdminIsFemale.value,
              isSuperior: false,
              password: _newAdminPassword.value,
            );

            await adminReference.set(admin.toJson());
            loginAdminUsingObject(admin);
            return AdminSavingStatus.saved;
          } else {
            return AdminSavingStatus.adminAlreadyExist;
          }
        })
        .first
        .then((value) => value);
  }

  Future<void> blockOrUnblockAdmin(String phoneNumber, bool action) async {
    DocumentReference reference =
        firestore.collection('admins').doc(phoneNumber);

    reference.get().then((value) async {
      if (value.exists) {
        debug.log('About To Block Admin...');
        await value.reference.update({"isBlocked": action});
      } else {
        getSnapbar('No Such Admin', 'Admin Do Not Exist');
      }
    });
  }
}
