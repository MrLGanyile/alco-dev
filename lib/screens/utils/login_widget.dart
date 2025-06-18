import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import 'package:get/get.dart';

import '../../controllers/shared_dao_functions.dart';
import '../../main.dart';
import 'dart:developer' as debug;

import 'globals.dart';
import 'verification_screen.dart';

class LoginWidget extends StatelessWidget {
  TextEditingController phoneNumberEditingController = TextEditingController();
  TextEditingController passwordEditingController = TextEditingController();
  bool forAdmin;
  LoginWidget({required this.forAdmin});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text('Login',
              style: TextStyle(
                  fontSize: MyApplication.infoTextFontSize,
                  color: MyApplication.attractiveColor1)),
          backgroundColor: Colors.black,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            iconSize: 20,
            color: MyApplication.logoColor2,
            onPressed: (() {
              Get.back();
            }),
          ),
          elevation: 0,
        ),
        body: SafeArea(
          child: Container(
            alignment: Alignment.topCenter,
            decoration: const BoxDecoration(
              color: Colors.black,
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Container(
                    height: 100,
                    width: 100,
                    decoration: const BoxDecoration(
                      image:
                          DecorationImage(image: AssetImage('assets/logo.png')),
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: TextField(
                      keyboardType: TextInputType.number,
                      minLines: 1,
                      maxLength: 10,
                      style: TextStyle(color: MyApplication.logoColor1),
                      cursorColor: MyApplication.logoColor1,
                      controller: phoneNumberEditingController,
                      decoration: InputDecoration(
                        labelText: 'Phone Number',
                        prefixIcon:
                            Icon(Icons.phone, color: MyApplication.logoColor1),
                        labelStyle: TextStyle(
                          fontSize: 14,
                          color: MyApplication.logoColor2,
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(6),
                          borderSide: BorderSide(
                            color: MyApplication.logoColor2,
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(6),
                          borderSide: BorderSide(
                            color: MyApplication.logoColor2,
                          ),
                        ),
                      ),
                      obscureText: false,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: TextField(
                      minLines: 1,
                      maxLength: 20,
                      style: TextStyle(color: MyApplication.logoColor1),
                      cursorColor: MyApplication.logoColor1,
                      controller: passwordEditingController,
                      decoration: InputDecoration(
                        labelText: 'Password',
                        prefixIcon:
                            Icon(Icons.lock, color: MyApplication.logoColor1),
                        labelStyle: TextStyle(
                          fontSize: 14,
                          color: MyApplication.logoColor2,
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(6),
                          borderSide: BorderSide(
                            color: MyApplication.logoColor2,
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(6),
                          borderSide: BorderSide(
                            color: MyApplication.logoColor2,
                          ),
                        ),
                      ),
                      obscureText: true,
                    ),
                  ),
                  Padding(
                    padding:
                        const EdgeInsets.only(left: 20, right: 20, bottom: 10),
                    child: proceedButton(context),
                  ),
                ],
              ),
            ),
          ),
        ));
  }

  Widget proceedButton(BuildContext context) => Container(
        width: MediaQuery.of(context).size.width,
        height: 60,
        decoration: BoxDecoration(
            color: MyApplication.logoColor1,
            borderRadius: const BorderRadius.all(
              Radius.circular(10),
            )),
        child: InkWell(
          onTap: () async {
            String phoneNumber =
                '+27${phoneNumberEditingController.text.substring(1)}';

            isCredentialsCorrect(
                    phoneNumber, passwordEditingController.text, forAdmin)
                .then(
              (value) async {
                if (value.count == 1) {
                  debug.log('Credentials Are Correct...');
                  final auth = FirebaseAuth.instance;

                  await auth.verifyPhoneNumber(
                    phoneNumber: phoneNumber,
                    verificationCompleted:
                        (PhoneAuthCredential credential) async {
                      debug.log(
                          '1. About To Signed In User From LoginWidget...');
                      // ANDROID ONLY!
                      // Sign the user in (or link) with the auto-generated credential
                      await auth.signInWithCredential(credential);
                    },
                    verificationFailed: (FirebaseAuthException e) {
                      if (e.code == 'invalid-phone-number') {
                        debug.log('The provided phone number is not valid.');
                      }

                      // Handle other errors
                    },
                    codeSent: (String verificationId, int? resendToken) async {
                      Get.to(() => VerificationScreen(
                            phoneNumber: phoneNumber,
                            verificationId: verificationId,
                            forAdmin: forAdmin,
                            forLogin: true,
                          ));
                    },
                    codeAutoRetrievalTimeout: (String verificationId) {},
                  );
                } else {
                  debug.log('Credentials Are Incorrect...');
                  phoneNumberEditingController.clear();
                  passwordEditingController.clear();
                  getSnapbar('Error', 'Try Again, Incorrect Credentials.');
                }
              },
            );
          },
          child: const Center(
            child: Text(
              'Proceed',
              style: TextStyle(
                fontSize: 16,
                color: Colors.black,
                fontWeight: FontWeight.w700,
              ),
            ),
          ),
        ),
      );
}
