//import 'package:firebase_phone_auth_handler/firebase_phone_auth_handler.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../main.dart';

bool showProgressBar = false;
Reference storageReference = FirebaseStorage
/*.instanceFor(
        bucket: "gs://alco-dev-3fd77.firebasestorage.app")
    .ref(); */
        .instanceFor(bucket: "gs://alcoholic-expressions.appspot.com/")
    .ref();
// String storageURL = "gs://alcoholic-expressions.appspot.com/";

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
