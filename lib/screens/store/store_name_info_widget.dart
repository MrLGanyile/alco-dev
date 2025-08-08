import 'package:cached_network_image/cached_network_image.dart';

import '../../controllers/group_controller.dart';
import '../../models/locations/supported_town_or_institution.dart';
import '../competition/competition_finished_widget.dart';
import '../competition/simple_group_competitor_widget.dart';
import '../competition/won_grand_price_widget.dart';
import '../utils/globals.dart';
import '/controllers/competition_controller.dart';
import '/screens/competition/competition_result_widget.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';

import '../../controllers/store_controller.dart';
import '../../models/competitions/competition.dart';
import '../../models/competitions/count_down_clock.dart';
import '../../models/users/group.dart';
import '../../models/stores/store_draw.dart';
import 'package:flutter/material.dart';

import '../../main.dart';
import '../../models/locations/converter.dart';

import 'dart:developer' as debug;

import '../../models/stores/store_draw_state.dart';
import '../../models/stores/store_name_info.dart';
import '../competition/group_competitor_widget.dart';
import '../competition/no_competition_widget.dart';
import '../competition/wait_widget.dart';
import 'notification_display_widget.dart';

// Branch : store_resources_crud ->  view_stores_front_end
class StoreNameInfoWidget extends StatefulWidget {
  StoreNameInfo storeNameInfo;

  int wonPriceIndex = -1; // For Testing Purposes Only.
  String wonGroupLeaderPhoneNumber = "-"; // For Testing Purposes Only.

  StoreNameInfoWidget({
    super.key,
    required this.storeNameInfo,
  });

  @override
  State<StatefulWidget> createState() => StoreNameInfoWidgetState();
}

class StoreNameInfoWidgetState extends State<StoreNameInfoWidget> {
  StoreController storeController = StoreController.storeController;
  GroupController groupController = GroupController.instance;
  late CompetitionController competitionController;
  late Stream<DocumentSnapshot> storeNameInfoSteam;

  late CountDownClock countDownClock;
  late DocumentReference competitionReference;
  late Competition competition;

  bool hasUpdatedNextDraw = false;

  // =======================================================

  // Not used yet, but will be later to avoid flickuring of group members images.
  late Widget currentGroupCompetitorWidget;
  CompetitionResultWidget? competitionResultWidget;
  // =======================================================

  List<String>? competitorsOrder;
  bool? pickWonGroup;
  // late Stream<List<Group>> groupsStream;
  late List<Group> groups;
  List<GroupCompetitorWidget> groupCompetitorsWidgets = [];
  List<SimpleGroupCompetitorWidget> simpleGroupCompetitorsWidgets = [];

  // Not used yet, but will be later to avoid flickuring of group members images.
  OnCurrentGroupSet? onCurrentGroupSet;

  int currentlyPointedGroupCompetitorIndex = -1;
  late SupportedTownOrInstitution groupTownOrInstitution;

  @override
  void initState() {
    super.initState();
    competitionController = CompetitionController.competitionController;
    storeNameInfoSteam = storeController
        .retrieveStoreNameInfo(widget.storeNameInfo.storeNameInfoId);
    groupTownOrInstitution = Converter.toSupportedTownOrInstitution(
        widget.storeNameInfo.sectionName);
  }

  void updateIsCurrentlyViewed(bool isCurrentlyViewed) {
    setState(() {
      widget.storeNameInfo.setIsCurrentlyViewed(isCurrentlyViewed);
    });
  }

  void updateCurrentGroupCompetitorWidget(
      GroupCompetitorWidget currentGroupCompetitorWidget) {
    this.currentGroupCompetitorWidget = currentGroupCompetitorWidget;
  }

  Column retrieveStoreDetails(BuildContext context) {
    // Information About The Hosting Store.
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // The Name Of A Store On Which The Winner Won From.
        Row(
          children: [
            Expanded(
              flex: 2,
              child: Text(
                'Host Name',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    color: MyApplication.storesTextColor,
                    fontWeight: FontWeight.bold,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 3,
              child: Text(
                widget.storeNameInfo.storeName,
                style: TextStyle(
                  fontSize: MyApplication.infoTextFontSize,
                  fontWeight: FontWeight.bold,
                  color: MyApplication.storesTextColor,
                  decoration: TextDecoration.none,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),
          ],
        ),

        // The Address Of A Store On Which The Winner Won From.
        Row(
          children: [
            Expanded(
              flex: 2,
              child: Text(
                'Pick Up Spot',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 3,
              child: Text(
                widget.storeNameInfo.storeArea,
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none,
                    overflow: TextOverflow.ellipsis),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Future<String> retrieveStoreImageURL(String storeImageURL) {
    return storageReference.child(storeImageURL).getDownloadURL();
  }

  AspectRatio retrieveStoreImage(BuildContext context, String storeImageURL) {
    // The Image Of A Store On Which The Winner Won From.
    return AspectRatio(
      aspectRatio: 5 / 2,
      /*child: Container(
        //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
        decoration: BoxDecoration(
          color: backgroundResourcesColor,
          borderRadius: BorderRadius.circular(20),
          image: DecorationImage(
              fit: BoxFit.cover, image: NetworkImage(storeImageURL)),
        ),
      ), */
      child: CachedNetworkImage(
        key: UniqueKey(),
        fit: BoxFit.cover,
        imageUrl: storeImageURL,
        fadeOutCurve: Curves.easeOutExpo,
        imageBuilder: (c, provider) {
          return Container(
            //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
            decoration: BoxDecoration(
              color: backgroundResourcesColor,
              borderRadius: BorderRadius.circular(20),
              image: DecorationImage(fit: BoxFit.cover, image: provider),
            ),
          );
        },
        placeholder: (c, s) {
          return getCircularProgressBar();
        },
        errorWidget: (c, s, d) {
          return getCircularProgressBar();
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      child: Column(
        children: [
          // Store Image
          Padding(
            padding: const EdgeInsets.only(bottom: 10),
            child: FutureBuilder(
                future:
                    retrieveStoreImageURL(widget.storeNameInfo.storeImageURL),
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return retrieveStoreImage(context, snapshot.data as String);
                  } else if (snapshot.hasError) {
                    debug.log('Error Fetching Store Image - ${snapshot.error}');
                    return getCircularProgressBar();
                  } else {
                    return getCircularProgressBar();
                  }
                }),
          ),
          // Store Details
          retrieveStoreDetails(context),
          myStoreState(),
        ],
      ),
    );
  }

  Widget myStoreState() {
    return Container(
      margin: const EdgeInsets.only(bottom: 5),
      child: StreamBuilder<DocumentSnapshot?>(
        stream: storeController.retrieveStoreDraw(
          widget.storeNameInfo.storeNameInfoId,
          widget.storeNameInfo.getCommingDrawId(),
          //widget.storeNameInfo.latestStoreDrawId,
        ), // Use comming draw
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data!.exists) {
            StoreDraw nextStoreDraw = StoreDraw.fromJson(snapshot.data);

            DateTime latestPast =
                DateTime.now().subtract(const Duration(days: 1));

            if (nextStoreDraw.drawDateAndTime.isBefore(latestPast)) {
              return NoCompetitionWidget(
                  storeId: widget.storeNameInfo.storeNameInfoId,
                  storeName: widget.storeNameInfo.storeName,
                  storeImageURL: widget.storeNameInfo.storeImageURL,
                  sectionName: widget.storeNameInfo.sectionName);
            } else if (nextStoreDraw.storeDrawState ==
                StoreDrawState.notConvertedToCompetition) {
              hasUpdatedNextDraw = false;
              return WaitWidget(
                storeDraw: nextStoreDraw,
              );
            } else {
              return StreamBuilder<DocumentSnapshot>(
                  stream: competitionController
                      .findCompetition(nextStoreDraw.storeDrawId!),
                  builder: (context, snapshot) {
                    if (snapshot.hasData) {
                      competition = Competition.fromJson(snapshot.data);

                      int day = nextStoreDraw.drawDateAndTime.day;
                      int month = nextStoreDraw.drawDateAndTime.month;
                      int year = nextStoreDraw.drawDateAndTime.year;
                      int hour = nextStoreDraw.drawDateAndTime.hour;
                      int minute = nextStoreDraw.drawDateAndTime.minute;

                      String collectionId = "$year-$month-$day@${hour}h$minute";

                      competitionReference = snapshot.data!.reference;

                      return readFromcountDownClock(
                        collectionId,
                        nextStoreDraw,
                      );
                    } else if (snapshot.hasError) {
                      debug.log(
                          "Error Fetching competition Data - ${snapshot.error}");
                      return getCircularProgressBar();
                    } else {
                      return getCircularProgressBar();
                    }
                  });
            }
          } else if (snapshot.hasError) {
            debug
                .log("Error Fetching Last Store Draw Data - ${snapshot.error}");
            return NoCompetitionWidget(
                storeId: widget.storeNameInfo.storeNameInfoId,
                storeName: widget.storeNameInfo.storeName,
                storeImageURL: widget.storeNameInfo.storeImageURL,
                sectionName: widget.storeNameInfo.sectionName);
          } else {
            return NoCompetitionWidget(
                storeId: widget.storeNameInfo.storeNameInfoId,
                storeName: widget.storeNameInfo.storeName,
                storeImageURL: widget.storeNameInfo.storeImageURL,
                sectionName: widget.storeNameInfo.sectionName);
          }
        },
      ),
    );
  }

  StreamBuilder<DocumentSnapshot> readFromcountDownClock(
    String coundDownClockId,
    StoreDraw nextStoreDraw,
  ) {
    return StreamBuilder<DocumentSnapshot>(
        stream: competitionController.retrieveCountDownClock(coundDownClockId),
        builder: ((context, snapshot) {
          if (snapshot.hasData && snapshot.data!.exists) {
            countDownClock = CountDownClock.fromJson(snapshot.data);

            int grandPricePickingDuration =
                competition.grandPricesOrder.length *
                    competition.pickingMultipleInSeconds;
            int groupPickingDuration = competition.competitorsOrder.length *
                competition.pickingMultipleInSeconds;
            int competitionTotalDuration = grandPricePickingDuration +
                competition.timeBetweenPricePickingAndGroupPicking! +
                groupPickingDuration;

            DateTime competitionEndTime = competition.dateTime
                .add(Duration(seconds: competitionTotalDuration));

            // pickingMultipleInSeconds * 20 // Remaining seconds
            if (countDownClock.remainingTime < 0) {
              // Show remaining time before competition starts.
              return WaitWidget(
                storeDraw: nextStoreDraw,
                remainingDuration:
                    Duration(seconds: countDownClock.remainingTime * -1),
                pickWonPrice: false,
                showPlayIcon: false,
                showAlarm: false,
                showRemainingTime: true,
                onCurrentlyViewedUpdate: updateIsCurrentlyViewed,
              );
            }
            // pickingMultipleInSeconds * x => Varies
            // Show grand prices with play icon.
            else if (!widget.storeNameInfo.isCurrentlyViewed &&
                countDownClock.remainingTime < competitionTotalDuration) {
              return WaitWidget(
                remainingDuration:
                    Duration(seconds: countDownClock.remainingTime),
                storeDraw: nextStoreDraw,
                pickWonPrice: false,
                showPlayIcon: true,
                showAlarm: false,
                showRemainingTime: false,
                grandPricesOrder: const [],
                onCurrentlyViewedUpdate: updateIsCurrentlyViewed,
              );
            }
            // pickingMultipleInSeconds * 6 // Grand Price Picking
            // Show and pick grand prices.
            else if (widget.storeNameInfo.isCurrentlyViewed &&
                countDownClock.remainingTime < grandPricePickingDuration) {
              return WaitWidget(
                  remainingDuration:
                      Duration(seconds: countDownClock.remainingTime),
                  storeDraw: nextStoreDraw,
                  pickWonPrice: true,
                  showAlarm: false,
                  grandPricesOrder: competition.grandPricesOrder,
                  pickingMultipleInSeconds:
                      competition.pickingMultipleInSeconds);
            }

            // pickingMultipleInSeconds * 1 // Won Price Display
            // Display won price.
            else if (widget.storeNameInfo.isCurrentlyViewed &&
                countDownClock.remainingTime <
                    grandPricePickingDuration +
                        competition.timeBetweenPricePickingAndGroupPicking!) {
              return WonGrandPriceWidget(wonPrice: competition.wonPrice!);
            }
            // pickingMultipleInSeconds * 200 // Group Picking Max Time or
            // pickingMultipleInSeconds * competitorsOrder.length // Group Picking Max Time
            // Show group picking
            else if (widget.storeNameInfo.isCurrentlyViewed &&
                countDownClock.remainingTime <
                    grandPricePickingDuration +
                        competition.timeBetweenPricePickingAndGroupPicking! +
                        groupPickingDuration) {
              currentlyPointedGroupCompetitorIndex = (countDownClock
                          .remainingTime -
                      grandPricePickingDuration -
                      competition.timeBetweenPricePickingAndGroupPicking!) ~/
                  competition.pickingMultipleInSeconds;
              return displayGroupCompetitors();
            }
            //  pickingMultipleInSeconds * 2 // Notification Display
            else if (widget.storeNameInfo.notification != null &&
                widget.storeNameInfo.notification!.endDate
                    .isAfter(DateTime.now()) &&
                countDownClock.remainingTime <=
                    competitionTotalDuration +
                        competition.pickingMultipleInSeconds * 2) {
              return NotificationDisplayWidget(
                  notification: widget.storeNameInfo.notification!);
            }
            //  pickingMultipleInSeconds * (28 or 30) // Competition Result Display
            // Show Won Price Summary For The Next Certain Amount Of Minute.
            else if (countDownClock.remainingTime <=
                competitionTotalDuration +
                    competition.displayPeriodAfterWinners!) {
              if (!competition.isOver) {
                competitionReference.update({"isOver": true});
              }

              if (widget.storeNameInfo.isCurrentlyViewed) {
                widget.storeNameInfo.setIsCurrentlyViewed(false);
              }

              return CompetitionResultWidget(
                wonPrice: competition.wonPrice!,
                wonGroup: competition.wonGroup!,
                competitionEndTime: competitionEndTime,
              );
            }
            // Remove the last played draw.
            else if (widget.storeNameInfo.drawsOrder != null &&
                widget.storeNameInfo.drawsOrder!.isNotEmpty &&
                countDownClock.remainingTime ==
                    competitionTotalDuration +
                        competition.displayPeriodAfterWinners! +
                        9 &&
                !hasUpdatedNextDraw) {
              hasUpdatedNextDraw = true;
              storeController
                  .updateDrawsOrder(widget.storeNameInfo.storeNameInfoId);

              return CompetitionFinishedWidget(endMoment: competitionEndTime);
            }

            // pickingMultipleInSeconds * 12 // Game Over
            else {
              return CompetitionFinishedWidget(endMoment: competitionEndTime);
            }
          } else if (snapshot.hasError) {
            debug.log('Error fetching count down clock data ${snapshot.error}');
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        }));
  }

  // Assuming there is a cloud function returning a list of fruit in the backend.
  Future<void> getFruit() async {
    HttpsCallable callable =
        FirebaseFunctions.instance.httpsCallable('listFruit');
    final results = await callable();
    List fruit =
        results.data; // ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes"]
  }

  Future<void> writeMessage(String message) async {
    HttpsCallable callable =
        FirebaseFunctions.instance.httpsCallable('writeMessage');
    final resp = await callable.call(<String, dynamic>{
      'text': 'A message sent from a client device',
    });
    print("result: ${resp.data}");
  }

  Future<void> setWonPriceSummary(String competitionId) async {
    HttpsCallable callable =
        FirebaseFunctions.instance.httpsCallable('createWonPriceSummary');
    await callable.call(<String, dynamic>{
      'competition': competitionId,
    });
  }

  Widget displayGroupCompetitors() {
    if (/*groupCompetitorsWidgets.isEmpty*/ simpleGroupCompetitorsWidgets
        .isEmpty) {
      return StreamBuilder<List<Group>>(
        // stream: groupsStream,
        stream: groupController
            .readGroups(groupTownOrInstitution.townOrInstitutionNo),
        // stream: groupController.readAllGroups(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            groups = snapshot.data!;
            addGroupCompetitorsWidgets();
            /*return groupCompetitorsWidgets[
                currentlyPointedGroupCompetitorIndex]; */

            return simpleGroupCompetitorsWidgets[
                currentlyPointedGroupCompetitorIndex];
          } else if (snapshot.hasError) {
            debug.log(
                'Error Fetching Group Competitors Data - ${snapshot.error}');
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        },
      );
    } else {
      // return groupCompetitorsWidgets[currentlyPointedGroupCompetitorIndex];
      return simpleGroupCompetitorsWidgets[
          currentlyPointedGroupCompetitorIndex];
    }
  }

  void addGroupCompetitorsWidgets() {
    if (/*groupCompetitorsWidgets.isEmpty*/ simpleGroupCompetitorsWidgets
        .isEmpty) {
      for (int groupCompetitorIndex = 0;
          groupCompetitorIndex < competition.competitorsOrder.length;
          groupCompetitorIndex++) {
        for (int i = 0; i < groups.length; i++) {
          if (groups[i].groupCreatorPhoneNumber.compareTo(
                  competition.competitorsOrder[groupCompetitorIndex]) ==
              0) {
            // Below is a group with images included.
            /*
            groupCompetitorsWidgets
                .add(GroupCompetitorWidget(group: groups[i])); */

            simpleGroupCompetitorsWidgets
                .add(SimpleGroupCompetitorWidget(group: groups[i]));
          }
        }
      }
    }
  }
}
