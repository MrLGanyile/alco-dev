import '/controllers/admin_controller.dart';
import '/controllers/alcoholic_controller.dart';
import '/controllers/shared_dao_functions.dart' as shared;
import '/screens/alcoholics/alcoholic_registration_widget.dart';
import '/screens/utils/login_widget.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:get/get.dart';

import '../../controllers/group_controller.dart';
import '../../main.dart';

import 'package:flutter/material.dart';

import 'dart:developer' as debug;

import '../admins/admin_screens_widget.dart';
import 'globals.dart';

// Branch : group_resources_crud ->  create_group_resources_front_end
class VerificationScreen extends StatefulWidget {
  String phoneNumber;
  String verificationId;
  bool forAdmin;
  bool forLogin;

  VerificationScreen({
    Key? key,
    required this.phoneNumber,
    required this.verificationId,
    required this.forAdmin,
    required this.forLogin,
  }) : super(key: key);

  @override
  State<VerificationScreen> createState() => _VerificationScreenState();
}

class _VerificationScreenState extends State<VerificationScreen> {
  GlobalKey<FormState> formKey = GlobalKey<FormState>();
  TextEditingController otpController = TextEditingController();
  GroupController groupController = GroupController.instance;
  AdminController adminController = AdminController.adminController;
  AlcoholicController alcoholicController =
      AlcoholicController.alcoholicController;

  Color snackBarBackgroundColor = Colors.white;
  Duration snackBarDuration = const Duration(seconds: 5);
  Color snackBarColorText = Colors.white;
  Color snackBarBorderColor = Colors.white;

  void verifySignin() async {
    shared.showProgressBar = true;
    try {
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: widget.verificationId, smsCode: otpController.text);
      final auth = FirebaseAuth.instance;
      await auth.signInWithCredential(credential);

      auth.currentUser!.getIdToken(true).then((token) async {
        // Send token to backend
        HttpsCallable callableFuntion =
            FirebaseFunctions.instance.httpsCallable(
          'setCurrentUID',
          options: HttpsCallableOptions(
            timeout: const Duration(seconds: 1),
          ),
        );

        Map<String, dynamic> data = {
          'token': token,
          'userId': auth.currentUser!.uid,
        };

        bool hasSignedIn = (await callableFuntion.call(data)) as bool;

        if (hasSignedIn) {
          if (widget.forAdmin) {
            Future<AdminSavingStatus> adminSavingStatus =
                adminController.saveAdmin(auth.currentUser!.uid);
            debug.log('Admin Saving TRIED');

            adminSavingStatus.then((value) {
              showProgressBar = false;
              if (value == AdminSavingStatus.unathourized) {
                debug.log(
                    'AdminSavingStatus.unathourized From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'You Are Not Authorized To Register An Admin.');
                Get.close(2);
              } else if (value == AdminSavingStatus.adminAlreadyExist) {
                debug.log(
                    'AdminSavingStatus.adminAlreadyExist From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'Admin Already Exist.');
                Get.back();
              } else if (value == AdminSavingStatus.loginRequired) {
                debug.log(
                    'AdminSavingStatus.loginRequired From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'Login Required.');
                Get.to(() => LoginWidget(forAdmin: true));
              } else if (value == AdminSavingStatus.incompleteData) {
                debug.log(
                    'AdminSavingStatus.incompleteData From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'Incomplete Admin Info.');
                Get.back();
              } else {
                debug.log(
                    '2. Successfully Saved User From VerificationScreen...');

                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Admin Saved',
                    'Registration Succeeded.');
                Get.to(AdminScreensWidget());
              }
            });
          } else {
            Future<AlcoholicSavingStatus> alcoholSavingStatus =
                alcoholicController.saveAlcoholic(auth.currentUser!.uid);

            alcoholSavingStatus.then((value) {
              shared.showProgressBar = false;
              if (value == AlcoholicSavingStatus.unathourized) {
                debug.log(
                    'AlcoholicSavingStatus.unathourized From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'You Are Not Authorized To Register A New User.');
                Get.close(2);
              } else if (value == AlcoholicSavingStatus.adminAlreadyExist) {
                debug.log(
                    'AlcoholicSavingStatus.adminAlreadyExist From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'User Already Exist.');
                Get.back();
              } else if (value == AlcoholicSavingStatus.loginRequired) {
                debug.log(
                    'AlcoholicSavingStatus.loginRequired From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'Login Required.');
                Get.to(() => LoginWidget(forAdmin: widget.forAdmin));
              } else if (value == AlcoholicSavingStatus.incompleteData) {
                debug.log(
                    'AlcoholicSavingStatus.incompleteData From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'Error',
                    'Incomplete Info.');
                Get.back();
              } else {
                debug.log('Successfully Saved User From VerificationScreen...');
                getSnapbar(
                    // backgroundColor: snackBarBackgroundColor,
                    // duration: snackBarDuration,
                    // colorText: snackBarColorText,
                    // borderColor: snackBarBorderColor,
                    'User Saved',
                    'Congratulations Registration Succeeded!!!.');
                Get.close(2);
              }
            });
          }
        }
      }).catchError((onError) {});
    } catch (error) {
      getSnapbar(
          // backgroundColor: snackBarBackgroundColor,
          // duration: snackBarDuration,
          // colorText: snackBarColorText,
          // borderColor: snackBarBorderColor,
          'Error',
          'Wrong Verification Code.');
      debug.log('Wrong Verification Code');
    } finally {
      shared.showProgressBar = false;
    }
  }

  void verifyLogin() async {
    showProgressBar = true;
    try {
      PhoneAuthCredential credential = PhoneAuthProvider.credential(
          verificationId: widget.verificationId, smsCode: otpController.text);
      final auth = FirebaseAuth.instance;
      await auth.signInWithCredential(credential);

      auth.currentUser!.getIdToken(true).then((token) async {
        // Send token to backend
        HttpsCallable callableFuntion =
            FirebaseFunctions.instance.httpsCallable(
          'setCurrentUID',
          options: HttpsCallableOptions(
            timeout: const Duration(seconds: 1),
          ),
        );

        Map<String, dynamic> data = {
          'token': token,
          'userId': auth.currentUser!.uid,
        };

        bool hasSignedIn = (await callableFuntion.call(data)) as bool;

        if (hasSignedIn) {
          if (widget.forAdmin) {
            adminController.loginAdmin(auth.currentUser!.uid);
            // Alert message required

          } else {
            alcoholicController.loginAlcoholic(auth.currentUser!.uid);
            // Alert message required
          }

          // Go back two times.
          Get.close(2);
        }
      }).catchError((onError) {});
    } catch (error) {
      getSnapbar(
          // backgroundColor: snackBarBackgroundColor,
          // duration: snackBarDuration,
          // colorText: snackBarColorText,
          // borderColor: snackBarBorderColor,
          'Error',
          'Wrong Verification Code.');
      debug.log('Wrong Verification Code');
    } finally {
      showProgressBar = false;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: SizedBox.expand(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
                children: [
                  _headingText(),
                  const SizedBox(
                    height: 20,
                  ),
                  _subHeadingText(),
                  const SizedBox(
                    height: 20,
                  ),
                  _numberText()
                ],
              ),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: TextField(
                  keyboardType: TextInputType.number,
                  maxLength: 10,
                  style: TextStyle(color: MyApplication.logoColor1),
                  cursorColor: MyApplication.logoColor1,
                  controller: otpController,
                  decoration: InputDecoration(
                    labelText: 'OTP',
                    prefixIcon:
                        Icon(Icons.numbers, color: MyApplication.logoColor1),
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
              shared.showProgressBar
                  ? const Center(child: CircularProgressIndicator())
                  : Container(
                      width: MediaQuery.of(context).size.width,
                      height: 60,
                      margin: const EdgeInsets.symmetric(horizontal: 20),
                      decoration: BoxDecoration(
                        color: MyApplication.logoColor1,
                        borderRadius: const BorderRadius.all(
                          Radius.circular(10),
                        ),
                      ),
                      child: InkWell(
                        onTap: () async {
                          widget.forLogin ? verifyLogin() : verifySignin();
                        },
                        child: const Center(
                          child: Text(
                            'Verify',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.black,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                      ),
                    )
            ],
          ),
        ),
      ),
    );
  }

  Widget _headingText() => Text(
        'Verification',
        style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 25,
            color: MyApplication.attractiveColor1),
      );

  Widget _subHeadingText() => const Text(
        'Enter the code sent to te number.',
        style: TextStyle(
          fontWeight: FontWeight.w300,
          fontSize: 15,
          color: Colors.white38,
        ),
      );

  Widget _numberText() => Text(
        widget.phoneNumber,
        style: TextStyle(
            fontWeight: FontWeight.w500,
            fontSize: 15,
            color: MyApplication.logoColor1),
      );
}
