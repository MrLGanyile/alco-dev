import 'package:cached_network_image/cached_network_image.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/material.dart';
import '../../../main.dart';

import '../../controllers/shared_resources_controller.dart';
import '../../models/locations/converter.dart';
import '../../models/users/admin.dart';
import '../../models/users/group.dart';
import 'dart:developer' as debug;
import 'dart:math';

import '../../models/users/user.dart';
import '../utils/globals.dart';

// Branch : group_resources_crud ->  create_group_resources_front_end
class SingleGroupWidget extends StatefulWidget {
  Group competitorsGroup;
  SingleGroupWidget({
    required this.competitorsGroup,
  });

  @override
  State createState() => SingleGroupWidgetState();
}

class SingleGroupWidgetState extends State<SingleGroupWidget> {
  late List<Reference> groupMembersImageReferences;

  SingleGroupWidgetState();

  Column retrieveGroupDetails(BuildContext context) {
    String townOrInstitution = Converter.townOrInstitutionAsString(
        widget.competitorsGroup.groupTownOrInstitution.townOrInstitutionName);

    String townOrInstitutionLabel;

    if (townOrInstitution.contains('DUT') ||
        townOrInstitution.contains('UKZN') ||
        townOrInstitution.contains('mangosuthu (mut)')) {
      townOrInstitutionLabel = 'Group Institution';
    } else {
      townOrInstitutionLabel = 'Group Town';
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Group Town/Institution Info
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 2,
              child: Text(
                townOrInstitutionLabel,
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 3,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  townOrInstitution,
                  style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis),
                ),
              ),
            ),
          ],
        ),

        // Group Area Info
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              flex: 2,
              child: Text(
                'Group Area',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    color: MyApplication.storesTextColor,
                    fontWeight: FontWeight.bold,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              flex: 3,
              child: Align(
                alignment: Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.only(right: 15),
                  child: Text(
                    Converter.asString(
                        widget.competitorsGroup.groupArea.sectionName),
                    style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),

        // Group Location Info
        widget.competitorsGroup.groupSpecificArea == null
            ? const SizedBox.shrink()
            : Row(
                //mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(
                    flex: 2,
                    child: Text(
                      'Group Location',
                      style: TextStyle(
                          fontSize: MyApplication.infoTextFontSize,
                          fontWeight: FontWeight.bold,
                          color: MyApplication.storesTextColor,
                          decoration: TextDecoration.none),
                    ),
                  ),
                  Expanded(
                    flex: 3,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        widget.competitorsGroup.groupSpecificArea!,
                        style: TextStyle(
                            fontSize: MyApplication.infoTextFontSize,
                            fontWeight: FontWeight.bold,
                            color: MyApplication.storesTextColor,
                            decoration: TextDecoration.none,
                            overflow: TextOverflow.ellipsis),
                      ),
                    ),
                  ),
                ],
              ),
      ],
    );
  }

  Column retrieveGroupCreatorDetails(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Group creator section details
        Row(
          //mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Text(
                'Creator Username',
                style: TextStyle(
                    fontSize: MyApplication.infoTextFontSize,
                    fontWeight: FontWeight.bold,
                    color: MyApplication.storesTextColor,
                    decoration: TextDecoration.none),
              ),
            ),
            Expanded(
              child: Align(
                alignment: Alignment.centerLeft,
                child: Text(
                  widget.competitorsGroup.groupCreatorUsername,
                  style: TextStyle(
                      fontSize: MyApplication.infoTextFontSize,
                      fontWeight: FontWeight.bold,
                      color: MyApplication.storesTextColor,
                      decoration: TextDecoration.none,
                      overflow: TextOverflow.ellipsis),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  AspectRatio retrieveGroupImage(BuildContext context, String groupImageURL) {
    return AspectRatio(
      aspectRatio: 8 / 2,
      /*child: Container(
        decoration: BoxDecoration(
          color: backgroundResourcesColor,
          borderRadius: BorderRadius.circular(20),
          image: DecorationImage(
            fit: BoxFit.cover,
            image: NetworkImage(groupImageURL),
          ),
        ),
      ), */

      child: CachedNetworkImage(
        key: UniqueKey(),
        fit: BoxFit.cover,
        imageUrl: groupImageURL,
        fadeOutCurve: Curves.easeOutExpo,
        imageBuilder: (c, provider) {
          return Container(
              decoration: BoxDecoration(
            color: backgroundResourcesColor,
            borderRadius: BorderRadius.circular(20),
            image: DecorationImage(
              fit: BoxFit.cover,
              image: provider,
            ),
          ));
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

  Widget createGroupParticipant(BuildContext context, int memberIndex) {
    return FutureBuilder(
        future: groupMembersImageReferences[memberIndex].getDownloadURL(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Padding(
              padding: const EdgeInsets.only(top: 5, right: 5, bottom: 5),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: backgroundResourcesColor,
                ),
                /*child: CircleAvatar(
                  backgroundColor: backgroundResourcesColor,
                  radius: MediaQuery.of(context).size.width / 8,
                  backgroundImage: NetworkImage(snapshot.data as String),
                ), */
                child: CachedNetworkImage(
                  key: UniqueKey(),
                  fit: BoxFit.cover,
                  imageUrl: snapshot.data as String,
                  fadeOutCurve: Curves.easeOutExpo,
                  imageBuilder: (c, provider) {
                    return CircleAvatar(
                        backgroundColor: backgroundResourcesColor,
                        radius: MediaQuery.of(context).size.width / 8,
                        backgroundImage: provider);
                  },

                  /* placeholder: (c, s) {
                      return getCircularProgressBar();
                    },
                    errorWidget: (c, s, d) {
                      return getCircularProgressBar();
                    }, 
                  */
                ),
              ),
            );
          } else if (snapshot.hasError) {
            debug.log(
                "Error Fetching Group Participant Data - ${snapshot.error}");
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        });
  }

  Widget createGroupMembers(BuildContext context) {
    Column column;
    Row row;

    List<Widget> rowChildren;
    List<Widget> columnChildren;

    if (groupMembersImageReferences.length <= 3) {
      rowChildren = [];
      for (int i = 0; i < groupMembersImageReferences.length; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );
      return row;
    } else {
      columnChildren = [];
      rowChildren = [];
      for (int i = 0; i < 3; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );
      columnChildren.add(row);

      rowChildren = [];
      for (int i = 3; i < groupMembersImageReferences.length; i++) {
        rowChildren.add(createGroupParticipant(context, i));
      }
      row = Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: rowChildren,
      );

      columnChildren.add(row);
      column = Column(children: columnChildren);
      return column;
    }
  }

  Future<String> findGroupImageURL() async {
    String downloadURL = await reference
        .child(widget.competitorsGroup.groupImageURL)
        .getDownloadURL();
    return downloadURL;
  }

  Future<String> findGroupCreatorImageURL() async {
    return await reference
        .child(widget.competitorsGroup.groupCreatorImageURL)
        .getDownloadURL();
  }

  Future<ListResult> findGroupMembersImageURLs() async {
    String host = Converter.townOrInstitutionAsString(widget
            .competitorsGroup.groupTownOrInstitution.townOrInstitutionName)
        .toLowerCase();

    if (host.contains('howard college ukzn') &&
        'howard college ukzn'.contains(host)) {
      host = 'ukzn'; // Supposed to be ukzn-howard
    } else if (host.contains('mangosuthu (mut)') &&
        'mangosuthu (mut)'.contains(host)) {
      host = 'mangosuthu (mut)';
    }
    return reference
        .child(
            '$host/group_members/${widget.competitorsGroup.groupCreatorPhoneNumber}/profile_images')
        .listAll();
  }

  Widget groupNameAndOrPhoneNumber() {
    User? user = getCurrentlyLoggenInUser();

    if (user != null && user is Admin && user.isSuperior) {
      return Row(
        children: [
          // Group Name [Phone Number]
          Text(
            '${widget.competitorsGroup.groupName} [${widget.competitorsGroup.groupCreatorPhoneNumber}]',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: MyApplication.attractiveColor1,
              decoration: TextDecoration.none,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      );
    }

    return Text(
      widget.competitorsGroup.groupName,
      style: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: MyApplication.attractiveColor1,
        decoration: TextDecoration.none,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      //height: 550,
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.only(left: 15),
            child: Column(children: [
              // Group Name & Group Id
              SizedBox(
                height: 30,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Align(
                      alignment: Alignment.centerLeft,
                      child: groupNameAndOrPhoneNumber(),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(right: 20),
                      child: CircleAvatar(
                        radius: 7,
                        backgroundColor: widget.competitorsGroup.isActive
                            ? Colors.green
                            : Colors.grey,
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 5,
              ),
              // Group Location/Area Details
              SizedBox(height: 60, child: retrieveGroupDetails(context)),
              const SizedBox(
                height: 5,
              ),
              // Group Creator Image & Group Image
              SizedBox(
                height: 150,
                child: Container(
                  margin:
                      const EdgeInsets.only(left: 15, right: 15, bottom: 15),
                  child: Row(
                    children: [
                      // Group Creator Image
                      Expanded(
                        child: Align(
                          alignment: Alignment.centerLeft,
                          child: Padding(
                            padding: const EdgeInsets.only(
                                top: 5, right: 5, bottom: 5),
                            child: SizedBox(
                              child: Column(
                                children: [
                                  FutureBuilder(
                                    future: findGroupCreatorImageURL(),
                                    builder: (context, snapshot) {
                                      if (snapshot.hasData) {
                                        final data = snapshot.data as String;

                                        /*return CircleAvatar(
                                          backgroundColor:
                                                    backgroundResourcesColor,
                                          radius: 40,
                                          backgroundImage: NetworkImage(data), */
                                        return CachedNetworkImage(
                                          key: UniqueKey(),
                                          fit: BoxFit.cover,
                                          imageUrl: data,
                                          fadeOutCurve: Curves.easeOutExpo,
                                          imageBuilder: (c, provider) {
                                            return CircleAvatar(
                                                backgroundColor:
                                                    backgroundResourcesColor,
                                                radius: 40,
                                                backgroundImage: provider);
                                          },
                                          placeholder: (c, s) {
                                            return getCircularProgressBar();
                                          },
                                          errorWidget: (c, s, d) {
                                            return getCircularProgressBar();
                                          },
                                        );
                                      } else if (snapshot.hasError) {
                                        debug.log(
                                            "Error Fetching Group Creator Data - ${snapshot.error}");
                                        return getCircularProgressBar();
                                      } else {
                                        return getCircularProgressBar();
                                      }
                                    },
                                  ),
                                  Text(
                                    'Leader',
                                    style: TextStyle(
                                      color: MyApplication.logoColor1,
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                  Text(
                                    widget
                                        .competitorsGroup.groupCreatorUsername,
                                    style: TextStyle(
                                      color: MyApplication.logoColor2,
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ),
                      // Group Image
                      Expanded(
                        flex: 2,
                        child: SizedBox(
                          height: 140,
                          child: FutureBuilder(
                            future: findGroupImageURL(),
                            builder: (context, snapshot) {
                              if (snapshot.hasData) {
                                final data = snapshot.data as String;

                                return retrieveGroupImage(context, data);
                              } else if (snapshot.hasError) {
                                debug.log(
                                    "Error Fetching Group Image Data - ${snapshot.error}");
                                return getCircularProgressBar();
                              } else {
                                return getCircularProgressBar();
                              }
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ]),
          ),
          FutureBuilder(
              future: findGroupMembersImageURLs(),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  ListResult allDownloadURLs = snapshot.data! as ListResult;

                  if (allDownloadURLs.items.length > 12) {
                    List<Reference> falseImagesReferences = [];
                    int randomStartIndex =
                        Random().nextInt(allDownloadURLs.items.length - 12);
                    int randomNumberOfGroupMembers = 1 + Random().nextInt(12);

                    for (int index = randomStartIndex;
                        index < randomStartIndex + randomNumberOfGroupMembers;
                        index++) {
                      falseImagesReferences.add(allDownloadURLs.items[index]);
                    }
                    groupMembersImageReferences = falseImagesReferences;
                  } else {
                    groupMembersImageReferences = allDownloadURLs.items;
                  }

                  return createGroupMembers(context);
                } else if (snapshot.hasError) {
                  debug.log(
                      "Error Fetching Group Members Data - ${snapshot.error}");
                  return getCircularProgressBar();
                } else {
                  return getCircularProgressBar();
                }
              }),
          const SizedBox(
            height: 5,
          ),
        ],
      ),
    );
  }
}
