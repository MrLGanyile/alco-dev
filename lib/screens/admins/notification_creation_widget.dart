import '../../screens/admins/admin_screens_widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/shared_dao_functions.dart';
import '../../controllers/store_controller.dart';
import '../../main.dart';
import '../../models/users/admin.dart';
import '../../models/users/alcoholic.dart';
import '../../models/users/user.dart';
import '../utils/globals.dart';

class NotificationCreationWidget extends StatefulWidget {
  NotificationCreationWidget();

  @override
  State<StatefulWidget> createState() => NotificationCreationWidgetState();
}

class NotificationCreationWidgetState
    extends State<NotificationCreationWidget> {
  TextEditingController messageTextEditingController = TextEditingController();
  TextEditingController audienceIdsTextEditingController =
      TextEditingController();
  StoreController storeController = StoreController.storeController;

  final List<String> stores = ["For All", "For Some"];
  int storesIndex = 1;

  updateGenderIndex(index) {
    setState(() {
      storesIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) => SingleChildScrollView(
        child: Center(
          child: Column(children: [
            Container(
              height: 100,
              width: 100,
              decoration: const BoxDecoration(
                image: DecorationImage(image: AssetImage('assets/logo.png')),
                shape: BoxShape.circle,
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            retrieveTextField('Message', messageTextEditingController,
                iconData: Icons.message, color: MyApplication.logoColor2),
            const SizedBox(
              height: 10,
            ),
            retrieveTextField('Audience Ids', audienceIdsTextEditingController,
                iconData: Icons.group, color: MyApplication.logoColor2),
            const SizedBox(
              height: 10,
            ),
            Row(
              children: [
                Expanded(
                  child: RadioListTile(
                      title: Text(
                        stores[0],
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: MyApplication.logoColor1),
                      ),
                      value: stores[0],
                      groupValue: stores[storesIndex],
                      onChanged: (newValue) {
                        if (newValue == 'For Some') {
                          updateGenderIndex(1);
                        } else {
                          updateGenderIndex(0);
                        }
                      }),
                ),
                Expanded(
                  child: RadioListTile(
                      title: Text(
                        stores[1],
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: MyApplication.logoColor1),
                      ),
                      value: stores[1],
                      groupValue: stores[storesIndex],
                      onChanged: (newValue) {
                        if (newValue == 'For Some') {
                          updateGenderIndex(1);
                        } else {
                          updateGenderIndex(0);
                        }
                      }),
                ),
              ],
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              height: 60,
              margin: const EdgeInsets.symmetric(horizontal: 15),
              decoration: BoxDecoration(
                  color: MyApplication.logoColor1,
                  borderRadius: const BorderRadius.all(
                    Radius.circular(10),
                  )),
              child: InkWell(
                onTap: () async {
                  List<String> audience = audienceIdsTextEditingController
                          .text.isEmpty
                      ? []
                      : audienceIdsTextEditingController.text.trim().split(" ");

                  User? user = getCurrentlyLoggenInUser();
                  if (user == null) {
                    getSnapbar('Unauthorized', 'Login Required');
                    return;
                  }

                  if (user is Alcoholic) {
                    getSnapbar('Unauthorized', 'Only Admins May Publish');
                    return;
                  }

                  if (user is Admin) {
                    if (!user.isSuperior) {
                      getSnapbar(
                          'Unauthorized', 'Only Superior Admins May Publish');
                      return;
                    }
                  }

                  // Save notice
                  Future<NoticeSavingStatus> status = storeController
                      .saveNotice(messageTextEditingController.text, audience,
                          forAll: storesIndex == 0);

                  status.then(
                    (value) {
                      if (value == NoticeSavingStatus.saved) {
                        messageTextEditingController.clear();
                        audienceIdsTextEditingController.clear();
                        getSnapbar(
                            'Notice Saved', 'Notice Published Successfully.');
                        Get.to(() => AdminScreensWidget());
                      }
                    },
                  );
                },
                child: const Center(
                  child: Text(
                    'Publish',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
            ),
          ]),
        ),
      );
}
