import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import '../../controllers/post_controller.dart';
import '../../controllers/shared_dao_functions.dart';
import '../../main.dart';
import '../../models/locations/converter.dart';
import '../../models/posts/past_post.dart';
import '../utils/globals.dart';

import 'dart:developer' as debug;

class SinglePastPostWidget extends StatelessWidget {
  PastPost pastPost;

  VideoPlayerController? whereWereYouVideoController;
  VideoPlayerController? whoWereYouWithVideoController;
  VideoPlayerController? whatHappenedVideoController;

  PostController postController = PostController.postController;

  SinglePastPostWidget({required this.pastPost});

  Widget whereWereYouWidget() {
    Widget widget = const SizedBox.shrink();

    if (pastPost.hasWhereWereYouText()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Align(
              alignment: Alignment.bottomLeft,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Where Was I?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 15),
                    child: Text(
                      pastPost.whereWereYouText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (pastPost.hasWhereWereYouImage()) {
      widget = Align(
        alignment: Alignment.bottomLeft,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Where Was I?',
              textAlign: TextAlign.left,
              style: TextStyle(
                  fontSize: 16, color: MyApplication.attractiveColor1),
            ),
            const SizedBox(
              height: 5,
            ),
            displayImage(pastPost.whereWereYouImageURL),
            const SizedBox(
              height: 5,
            ),
          ],
        ),
      );
    } else if (pastPost.hasWhereWereYouVoiceRecord()) {
      // Display play button
    } else if (pastPost.hasWhereWereYouVideo()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Align(
            alignment: Alignment.bottomLeft,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Where Were You?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                ),
                buildVideoDisplay(0),
              ],
            ),
          ),
        ),
      );
    }

    return widget;
  }

  Widget whoWereYouWithWidget() {
    Widget widget = const SizedBox.shrink();

    if (pastPost.hasWhoWereYouWithText()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Align(
              alignment: Alignment.bottomLeft,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Who Was With Me?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 15),
                    child: Text(
                      pastPost.whoWereYouWithText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (pastPost.hasWhoWereYouWithImage()) {
      widget = Align(
        alignment: Alignment.bottomLeft,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Who Was With Me?',
              textAlign: TextAlign.left,
              style: TextStyle(
                  fontSize: 16, color: MyApplication.attractiveColor1),
            ),
            const SizedBox(
              height: 5,
            ),
            displayImage(pastPost.whoWereYouWithImageURL),
            const SizedBox(
              height: 5,
            ),
          ],
        ),
      );
    } else if (pastPost.hasWhoWereYouWithVoiceRecord()) {
      // Display play button
    } else if (pastPost.hasWhoWereYouWithVideo()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Align(
            alignment: Alignment.bottomLeft,
            child: Column(
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'Who Was With Me?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                ),
                const SizedBox(
                  height: 3,
                ),
                buildVideoDisplay(1),
              ],
            ),
          ),
        ),
      );
    }

    return widget;
  }

  Widget whatHappenedWidget() {
    Widget widget = const SizedBox.shrink();

    if (pastPost.hasWhatHappenedText()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
            padding: const EdgeInsets.all(10),
            child: Align(
              alignment: Alignment.bottomLeft,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'What Happened?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 15),
                    child: Text(
                      pastPost.whatHappenedText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (pastPost.hasWhatHappenedVoiceRecord()) {
      // Display play button
    } else if (pastPost.hasWhatHappenedVideo()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 10),
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Align(
            alignment: Alignment.bottomLeft,
            child: Column(
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    'What Happened?',
                    textAlign: TextAlign.left,
                    style: TextStyle(
                        fontSize: 16, color: MyApplication.attractiveColor1),
                  ),
                ),
                buildVideoDisplay(2),
              ],
            ),
          ),
        ),
      );
    }

    return widget;
  }

  Widget displayImage(String imageURL) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: AspectRatio(
        aspectRatio: 2 / 2,
        child: FutureBuilder(
            future: findFullImageURL(imageURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                /*return Container(
                  //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
                  decoration: BoxDecoration(
                    color: backgroundResourcesColor,
                    borderRadius: BorderRadius.circular(20),
                    image: DecorationImage(
                        fit: BoxFit.cover,
                        image: NetworkImage(snapshot.data.toString())),
                  ),
                ); */
                return CachedNetworkImage(
                  key: UniqueKey(),
                  fit: BoxFit.cover,
                  imageUrl: snapshot.data.toString(),
                  fadeOutCurve: Curves.easeOutExpo,
                  imageBuilder: (c, provider) {
                    return Container(
                      //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
                      decoration: BoxDecoration(
                        color: backgroundResourcesColor,
                        borderRadius: BorderRadius.circular(20),
                        image:
                            DecorationImage(fit: BoxFit.cover, image: provider),
                      ),
                    );
                  },
                  placeholder: (c, s) {
                    return getCircularProgressBar();
                  },
                  errorWidget: (c, s, d) {
                    return getCircularProgressBar();
                  },
                );
              } else if (snapshot.hasError) {
                debug.log('Error Fetching Post Image - ${snapshot.error}');
                return getCircularProgressBar();
              } else {
                return getCircularProgressBar();
              }
            }),
      ),
    );
  }

  Widget buildVideoDisplay(int questionNumberIndex) {
    Widget? widget;
    switch (questionNumberIndex) {
      case 0:
        if (whereWereYouVideoController == null) {
          widget = FutureBuilder(
            future: findFullImageURL(pastPost.whereWereYouVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whereWereYouVideoController =
                    VideoPlayerController.network(path);
                whereWereYouVideoController!.initialize();
                whereWereYouVideoController!.setVolume(10);
                whereWereYouVideoController!.setLooping(false);
                return VideoPlayer(whereWereYouVideoController!);
              } else if (snapshot.hasError) {
                debug.log(
                    'Error Fetching Where Were You Post Video - ${snapshot.error}');
                return getCircularProgressBar();
              } else {
                return getCircularProgressBar();
              }
            },
          );
        }

        break;
      case 1:
        if (whoWereYouWithVideoController == null) {
          widget = FutureBuilder(
            future: findFullImageURL(pastPost.whoWereYouWithVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whoWereYouWithVideoController =
                    VideoPlayerController.network(path);
                whoWereYouWithVideoController!.initialize();
                whoWereYouWithVideoController!.setVolume(10);
                whoWereYouWithVideoController!.setLooping(false);
                return VideoPlayer(whoWereYouWithVideoController!);
              } else if (snapshot.hasError) {
                debug.log(
                    'Error Fetching Post Who Were You With Video - ${snapshot.error}');
                return getCircularProgressBar();
              } else {
                return getCircularProgressBar();
              }
            },
          );
        }

        break;
      case 2:
        if (whatHappenedVideoController == null) {
          widget = FutureBuilder(
            future: findFullImageURL(pastPost.whatHappenedVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whatHappenedVideoController =
                    VideoPlayerController.network(path);
                whatHappenedVideoController!.initialize();
                whatHappenedVideoController!.setVolume(10);
                whatHappenedVideoController!.setLooping(false);
                return VideoPlayer(whatHappenedVideoController!);
              } else if (snapshot.hasError) {
                debug.log(
                    'Error Fetching What Happened Post Video - ${snapshot.error}');
                return getCircularProgressBar();
              } else {
                return getCircularProgressBar();
              }
            },
          );
        }
    }

    if (widget == null) return const SizedBox.shrink();

    return Builder(builder: (context) {
      return SizedBox(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height / 1.8,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: widget,
        ),
      );
    });
  }

  Widget heading() => Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Expanded(
            child: FutureBuilder(
                future: findFullImageURL(pastPost.postCreator.profileImageURL),
                builder: ((context, snapshot) {
                  if (snapshot.hasData) {
                    /*return CircleAvatar(
                      radius: MediaQuery.of(context).size.width * 0.09,
                      backgroundColor: backgroundResourcesColor,
                      backgroundImage: NetworkImage(snapshot.data as String),
                    ); */

                    return CachedNetworkImage(
                      key: UniqueKey(),
                      fit: BoxFit.cover,
                      imageUrl: snapshot.data as String,
                      fadeOutCurve: Curves.easeOutExpo,
                      imageBuilder: (c, provider) {
                        return CircleAvatar(
                          radius: MediaQuery.of(context).size.width * 0.09,
                          backgroundColor: backgroundResourcesColor,
                          backgroundImage: provider,
                        );
                      },
                      placeholder: (c, s) {
                        return getCircularProgressBar();
                      },
                      errorWidget: (c, s, d) {
                        return getCircularProgressBar();
                      },
                    );
                  } else if (snapshot.hasError) {
                    return getCircularProgressBar();
                  } else {
                    return getCircularProgressBar();
                  }
                })),
          ),
          Expanded(
            flex: 4,
            child: Container(
              margin: const EdgeInsets.only(left: 5),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '@${pastPost.postCreator.username}',
                    //textAlign: TextAlign.center,
                    style: TextStyle(
                      decoration: TextDecoration.none,
                      color: MyApplication.logoColor2,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      // overflow: TextOverflow.ellipsis
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Text(
                      pastPost.passedTimeRepresentation(),
                      style: TextStyle(
                          fontSize: 12,
                          color: MyApplication.logoColor1,
                          decoration: TextDecoration.none,
                          overflow: TextOverflow.ellipsis),
                    ),
                  ),
                  Text(
                    Converter.asString(pastPost.postCreator.area.sectionName),
                    // textAlign: TextAlign.center,
                    style: TextStyle(
                        decoration: TextDecoration.none,
                        color: MyApplication.logoColor2,
                        fontSize: 14,
                        fontWeight: FontWeight.w600,
                        overflow: TextOverflow.ellipsis),
                  ),
                ],
              ),
            ),
          ),
        ],
      );

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.only(right: 10.0, left: 10.0, top: 10.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            heading(),
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                children: [
                  whereWereYouWidget(),
                  const SizedBox(
                    height: 1,
                  ),
                  whoWereYouWithWidget(),
                  const SizedBox(
                    height: 1,
                  ),
                  whatHappenedWidget(),
                ],
              ),
            ),
          ],
        ),
      );
}
