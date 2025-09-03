//import 'package:firebase_phone_auth_handler/firebase_phone_auth_handler.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/admin_controller.dart';
import '../../controllers/alcoholic_controller.dart';
import '../../main.dart';
import 'dart:developer' as debug;
import 'dart:io';
import 'package:flutter_image_compress/flutter_image_compress.dart';

import '../../models/users/admin.dart';
import '../../models/users/user.dart' as myUser;
import '../../models/users/alcoholic.dart';

final firestore = FirebaseFirestore.instance;
final functions = FirebaseFunctions.instance;
final auth = FirebaseAuth.instance;
final reference = FirebaseStorage

//.instance.ref();
        .instanceFor(bucket: "gs://alco-dev-15405.firebasestorage.app")
    // .instanceFor(bucket: "gs://alcoholic-expressions.appspot.com/")
    .ref();

AdminController adminController = AdminController.adminController;
AlcoholicController alcoholicController =
    AlcoholicController.alcoholicController;

// Upload an image into a particular firebase storage bucket.
Future<String> uploadResource(File resource, String storagePath,
    {String contentType = "image/jpeg"}) async {
  final metadata = SettableMetadata(contentType: contentType);

  return await compressImage(resource).then((compressedImageFile) async {
    UploadTask uploadTask;
    TaskSnapshot taskSnapshot;
    String downloadURL;
    if (compressedImageFile == null) {
      uploadTask = reference.child(storagePath).putFile(resource, metadata);
      taskSnapshot = await uploadTask;

      downloadURL = await taskSnapshot.ref.getDownloadURL();
      return downloadURL;
    } else {
      uploadTask =
          reference.child(storagePath).putFile(compressedImageFile, metadata);
      taskSnapshot = await uploadTask;

      downloadURL = await taskSnapshot.ref.getDownloadURL();
      return downloadURL;
    }
  });
}

Future<File?> compressImage(File file) async {
  debug.log('Before Compression ${file.lengthSync() / 1024}kb');

  XFile? result = (await FlutterImageCompress.compressAndGetFile(
    file.absolute.path,
    '${file.path}.compressed.jpg',
    quality: 88,
    // rotate: 180,
  ));

  if (result == null) {
    debug.log('After Compression Result Is Null');
    return null;
  } else {
    result.length().then((value) {
      debug.log('Result Path [After Compression] ${result.path}');
    });

    return File(result.path);
  }
}

Future<String> findFullURL(String imageURL) async {
  return await reference.child(imageURL).getDownloadURL();
}

Future<bool> isLoginAcceptable(
    String phoneNumber, String password, bool forAdmin) async {
  Query<Map<String, dynamic>> reference;
  if (forAdmin) {
    reference = firestore.collection('admins');
    reference.get().then((snapshot) {
      snapshot.docs.map((adminDoc) {
        Admin admin = Admin.fromJson(adminDoc.data());

        if (admin.phoneNumber.compareTo(phoneNumber) == 0 &&
            admin.password.compareTo(password) == 0) {
          return true;
        }
      });
    });
  } else {
    reference = firestore.collection('alcoholics');
    reference.get().then((snapshot) {
      snapshot.docs.map((alcoholicDoc) {
        Alcoholic alcoholic = Alcoholic.fromJson(alcoholicDoc.data());

        if (alcoholic.phoneNumber.compareTo(phoneNumber) == 0 &&
            alcoholic.password.compareTo(password) == 0) {
          return true;
        }
      });
    });
  }
  return false;
}

Future<AggregateQuerySnapshot> isCredentialsCorrect(
    String phoneNumber, String password, bool forAdmin) async {
  Query<Map<String, dynamic>> reference;
  if (forAdmin) {
    reference = firestore
        .collection('admins')
        .where("phoneNumber", isEqualTo: phoneNumber)
        .where('password', isEqualTo: password);
  } else {
    reference = firestore
        .collection('alcoholics')
        .where("phoneNumber", isEqualTo: phoneNumber)
        .where('password', isEqualTo: password);

    reference = firestore.collection('alcoholics');
  }

  AggregateQuerySnapshot? result = await reference.count().get();
  return result;
}

myUser.User? getCurrentlyLoggenInUser() {
  if (adminController.currentlyLoggedInAdmin != null) {
    return adminController.currentlyLoggedInAdmin;
  }

  return alcoholicController.currentlyLoggedInAlcoholic;
}

void logoutUser() {
  if (adminController.currentlyLoggedInAdmin != null ||
      alcoholicController.currentlyLoggedInAlcoholic != null) {}

  if (adminController.currentlyLoggedInAdmin != null) {
    adminController.logoutAdmin();
  }

  if (alcoholicController.currentlyLoggedInAlcoholic != null) {
    alcoholicController.logoutAlcoholic();
  }
}

bool isLoggedInAdmin() {
  return adminController.currentlyLoggedInAdmin != null;
}

Color backgroundResourcesColor = Colors.black;
double blueIconsSize = 30;

Widget getCircularProgressBar() => Center(
        child: CircularProgressIndicator(
      color: backgroundResourcesColor,
    ));

void getSnapbar(title, message) {
  /* SnackBar(
      elevation: 0,
      backgroundColor: Colors.transparent,
      content: Opacity(
        opacity: .7,
        child: Container(), // your content
      )); */
  Get.snackbar(title, message);
}

bool containsPlusAndNumbersOnly(String phoneNumber) {
  if (phoneNumber[0] != '+' || phoneNumber[1] != '2' || phoneNumber[2] != '7') {
    return false;
  }
  for (var charIndex = 3; charIndex < phoneNumber.length; charIndex++) {
    if (!(phoneNumber[charIndex] == '0' ||
        phoneNumber[charIndex] == '1' ||
        phoneNumber[charIndex] == '2' ||
        phoneNumber[charIndex] == '3' ||
        phoneNumber[charIndex] == '4' ||
        phoneNumber[charIndex] == '5' ||
        phoneNumber[charIndex] == '6' ||
        phoneNumber[charIndex] == '7' ||
        phoneNumber[charIndex] == '8' ||
        phoneNumber[charIndex] == '9')) {
      return false;
    }
  }
  return true;
}

bool isValidPhoneNumber(String phoneNumber) {
  return phoneNumber.isNotEmpty &&
      phoneNumber.length == 12 &&
      containsPlusAndNumbersOnly(phoneNumber) &&
      (phoneNumber.startsWith('+276') ||
          phoneNumber.startsWith('+277') ||
          phoneNumber.startsWith('+278'));
}

Widget retrieveTextField(
  String description,
  TextEditingController controller, {
  Color? color,
  IconData? iconData,
}) {
  return Container(
    margin: const EdgeInsets.symmetric(horizontal: 15),
    child: TextField(
      maxLines: 10,
      minLines: 1,
      style: TextStyle(color: MyApplication.scaffoldBodyColor),
      cursorColor: MyApplication.scaffoldBodyColor,
      controller: controller,
      decoration: InputDecoration(
        prefixIcon: iconData == null
            ? null
            : Icon(iconData, color: MyApplication.logoColor1),
        labelText: description,
        helperMaxLines: 10,
        labelStyle: TextStyle(
          fontSize: 14,
          color: color == null
              ? MyApplication.logoColor1
              : MyApplication.logoColor2,
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(6),
          borderSide: BorderSide(
            color: color == null
                ? MyApplication.logoColor1
                : MyApplication.logoColor2,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(6),
          borderSide: BorderSide(
            color: MyApplication.logoColor1,
          ),
        ),
      ),
      obscureText: false,
    ),
  );
}

class Globals {
  const Globals._();

  //static final auth = FirebaseAuth.instance;

  //static User? get firebaseUser => auth.currentUser;

  static final scaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();
}
