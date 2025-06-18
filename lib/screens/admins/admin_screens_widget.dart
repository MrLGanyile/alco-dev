import '../../controllers/admin_controller.dart';
import '../../controllers/group_controller.dart';
import '../../controllers/shared_dao_functions.dart';
import '../../models/users/admin.dart';
import '../store/date_picker.dart';
import '../store/store_draw_registration_widget.dart';
import 'admin_registration_widget.dart';
import 'package:get/get.dart';

import 'package:flutter/material.dart';

import '../../main.dart';

import 'admins_widget.dart';
import 'notification_creation_widget.dart';
import 'recruitment_widget.dart';

class AdminScreensWidget extends StatefulWidget {
  AdminScreensWidget({
    super.key,
  });

  @override
  _AdminScreensWidgetState createState() => _AdminScreensWidgetState();
}

class _AdminScreensWidgetState extends State<AdminScreensWidget>
    with SingleTickerProviderStateMixin {
  late GroupController groupController;
  int currentIndex = 0;
  double listTilesFontSize = 15;
  double listTilesIconSize = 30;
  List<String> titles = ['Admins', 'Recruit', 'Draws', 'Notify', 'Activation'];
  bool groupsDeactivated = false;

  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(
      length: 5,
      vsync: this,
    );
    groupController = GroupController.instance;
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void updateCurrentIndex(int index) {
    setState(() => currentIndex = index);
  }

  void refresh() {
    setState(() {
      groupsDeactivated = !groupsDeactivated;
      groupController.activateOrDeactivateAllGroups(groupsDeactivated);
    });
  }

  mayDeactivateAllGroups() {
    Admin? admin = adminController.currentlyLoggedInAdmin;
    if (admin != null) {
      return admin.isSuperiorAdmin;
    }

    return false;
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: MyApplication.scaffoldColor,
        appBar: AppBar(
          backgroundColor: MyApplication.scaffoldColor,
          leading: IconButton(
            icon: const Icon(Icons.arrow_back),
            iconSize: MyApplication.backArrowFontSize,
            color: MyApplication.backArrowColor,
            onPressed: (() => Get.back()),
          ),
          title: Text(
            titles[currentIndex],
            style: TextStyle(
              fontSize: MyApplication.infoTextFontSize,
              color: MyApplication.attractiveColor1,
              fontWeight: FontWeight.bold,
            ),
          ),
          actions: [
            mayDeactivateAllGroups()
                ? IconButton(
                    icon: const Icon(Icons.refresh),
                    iconSize: MyApplication.backArrowFontSize,
                    color: MyApplication.backArrowColor,
                    onPressed: (() {
                      refresh();
                    }),
                  )
                : const SizedBox.shrink(),
          ],
          elevation: 0,
          centerTitle: true,
          bottom: TabBar(
            onTap: updateCurrentIndex,
            labelColor: MyApplication.logoColor1,
            controller: _tabController,
            indicatorColor: MyApplication.logoColor2,
            indicatorWeight: 5,
            //dividerHeight: 0,
            indicatorPadding: const EdgeInsets.only(bottom: 8),
            tabs: [
              Tab(
                icon: Icon(
                  Icons.group,
                  color: MyApplication.attractiveColor1,
                ),
                text: 'Admins',
              ),
              Tab(
                icon: Icon(Icons.admin_panel_settings,
                    color: MyApplication.attractiveColor1),
                text: 'Recruit',
              ),
              Tab(
                icon: Icon(Icons.draw, color: MyApplication.attractiveColor1),
                text: 'Draws',
              ),
              Tab(
                icon: Icon(Icons.notifications,
                    color: MyApplication.attractiveColor1),
                text: 'Notify',
              ),
              Tab(
                icon: Icon(Icons.card_membership,
                    color: MyApplication.attractiveColor1),
                text: 'Activation',
              ),
            ],
          ),
        ),
        body: SafeArea(
          child: Container(
            decoration: BoxDecoration(
              color: MyApplication.scaffoldColor,
            ),
            child: TabBarView(controller: _tabController, children: [
              AdminsWidget(),
              AdminRegistrationWidget(),
              const StoreDrawRegistrationWidget(),
              NotificationCreationWidget(),
              RecruitmentWidget(),
            ]),
          ),
        ),
      );
}
