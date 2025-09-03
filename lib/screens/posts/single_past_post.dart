import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:visibility_detector/visibility_detector.dart';
import 'package:visibility_detector/visibility_detector.dart';

import '../../controllers/post_controller.dart';
import '../../controllers/shared_resources_controller.dart';
import '../../main.dart';
import '../../models/locations/converter.dart';
import '../../models/posts/past_post.dart';
import '../utils/globals.dart';

import 'dart:developer' as debug;

class SinglePastPostWidget extends StatefulWidget {
  PastPost pastPost;

  SinglePastPostWidget({required this.pastPost});

  @override
  State<SinglePastPostWidget> createState() => SinglePastPostWidgetState();
}

class SinglePastPostWidgetState extends State<SinglePastPostWidget> {
  VideoPlayerController? whereWereYouVideoController;
  VideoPlayerController? whoWereYouWithVideoController;
  VideoPlayerController? whatHappenedVideoController;

  PostController postController = PostController.postController;
  late VisibilityDetectorController visibilityDetectorController;

  bool playWhatHappenedVideo = false;

  SinglePastPostWidgetState();

  @override
  void initState() {
    super.initState();

    visibilityDetectorController = VisibilityDetectorController();
  }

  @override
  void dispose() {
    super.dispose();

    // VisibilityDetectorController.instance.updateInterval = Duration.zero;

    if (whereWereYouVideoController != null) {
      whereWereYouVideoController!.dispose();
    }

    if (whoWereYouWithVideoController != null) {
      whoWereYouWithVideoController!.dispose();
    }

    if (whatHappenedVideoController != null) {
      whatHappenedVideoController!.dispose();
    }
  }

  Widget whereWereYouWidget() {
    Widget widget = const SizedBox.shrink();

    if (this.widget.pastPost.hasWhereWereYouText()) {
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
                      this.widget.pastPost.whereWereYouText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (this.widget.pastPost.hasWhereWereYouImage()) {
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
                const SizedBox(
                  height: 5,
                ),
                Container(
                    margin: const EdgeInsets.only(left: 5, right: 5),
                    child: displayImage(
                        this.widget.pastPost.whereWereYouImageURL)),
                const SizedBox(
                  height: 5,
                ),
              ],
            ),
          ),
        ),
      );
    } else if (this.widget.pastPost.hasWhereWereYouVoiceRecord()) {
      // Display play button
    } else if (this.widget.pastPost.hasWhereWereYouVideo()) {
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
                Container(
                  margin: const EdgeInsets.only(left: 15, right: 15),
                  child: buildVideoDisplay(0),
                )
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

    if (this.widget.pastPost.hasWhoWereYouWithText()) {
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
                      this.widget.pastPost.whoWereYouWithText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (this.widget.pastPost.hasWhoWereYouWithImage()) {
      widget = Card(
        color: Colors.black.withBlue(30),
        margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
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
              const SizedBox(
                height: 5,
              ),
              displayImage(this.widget.pastPost.whoWereYouWithImageURL),
              const SizedBox(
                height: 5,
              ),
            ],
          ),
        ),
      );
    } else if (this.widget.pastPost.hasWhoWereYouWithVoiceRecord()) {
      // Display play button
    } else if (this.widget.pastPost.hasWhoWereYouWithVideo()) {
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
                Container(
                    margin: const EdgeInsets.only(left: 15, right: 15),
                    child: buildVideoDisplay(1)),
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

    if (this.widget.pastPost.hasWhatHappenedText()) {
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
                      this.widget.pastPost.whatHappenedText,
                      textAlign: TextAlign.left,
                      style: TextStyle(
                          fontSize: 16, color: MyApplication.storesTextColor),
                    ),
                  ),
                ],
              ),
            )),
      );
    } else if (this.widget.pastPost.hasWhatHappenedVoiceRecord()) {
      // Display play button
    } else if (this.widget.pastPost.hasWhatHappenedVideo()) {
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
                Container(
                    margin: const EdgeInsets.only(left: 15, right: 15),
                    child: buildVideoDisplay(2)),
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
        aspectRatio: 2 / 3,
        child: FutureBuilder(
            future: findFullURL(imageURL),
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
                        // color: backgroundResourcesColor,
                        borderRadius: BorderRadius.circular(5),
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
            future: findFullURL(this.widget.pastPost.whereWereYouVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whereWereYouVideoController =
                    VideoPlayerController.network(path);
                whereWereYouVideoController!.initialize();
                whereWereYouVideoController!.setVolume(10);
                whereWereYouVideoController!.setLooping(false);

                debug.log('Where Were You Video Controller Initialized.');

                return VisibilityDetector(
                  key: UniqueKey(),
                  child: GestureDetector(
                      onTap: () {
                        whereWereYouVideoController!.seekTo(Duration.zero);
                        whereWereYouVideoController!.play();
                      },
                      child: VideoPlayer(whereWereYouVideoController!)),
                  onVisibilityChanged: (visibilityInfo) {
                    if (visibilityInfo.visibleFraction == 1) {
                      whereWereYouVideoController!.play();
                    } else {
                      whereWereYouVideoController!.pause();
                    }
                  },
                );
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
            future: findFullURL(this.widget.pastPost.whoWereYouWithVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whoWereYouWithVideoController =
                    VideoPlayerController.network(path);
                whoWereYouWithVideoController!.initialize();
                whoWereYouWithVideoController!.setVolume(10);
                whoWereYouWithVideoController!.setLooping(false);

                return VisibilityDetector(
                  key: UniqueKey(),
                  child: GestureDetector(
                      onTap: () {
                        whoWereYouWithVideoController!.seekTo(Duration.zero);
                        whoWereYouWithVideoController!.play();
                      },
                      child: VideoPlayer(whoWereYouWithVideoController!)),
                  onVisibilityChanged: (visibilityInfo) {
                    if (visibilityInfo.visibleFraction == 1) {
                      whoWereYouWithVideoController!.play();
                    } else {
                      whoWereYouWithVideoController!.pause();
                    }
                  },
                );
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
            future: findFullURL(this.widget.pastPost.whatHappenedVideoURL),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                String path = (snapshot as AsyncSnapshot<String>).data!;

                whatHappenedVideoController =
                    VideoPlayerController.network(path);
                whatHappenedVideoController!.initialize();
                whatHappenedVideoController!.setVolume(10);
                whatHappenedVideoController!.setLooping(false);

                return VisibilityDetector(
                  key: UniqueKey(),
                  child: GestureDetector(
                      onTap: () {
                        whatHappenedVideoController!.seekTo(Duration.zero);
                        whatHappenedVideoController!.play();
                      },
                      child: VideoPlayer(whatHappenedVideoController!)),
                  onVisibilityChanged: (visibilityInfo) {
                    if (visibilityInfo.visibleFraction < 1) {
                      // debug.log('${visibilityInfo.visibleFraction * 100}');
                      whatHappenedVideoController!.pause();
                    } else {
                      whatHappenedVideoController!.play();
                    }
                  },
                );
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
          padding: const EdgeInsets.only(top: 10.0),
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
                future: findFullURL(
                    this.widget.pastPost.postCreator.profileImageURL),
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
                    '@${this.widget.pastPost.postCreator.username}',
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
                      this.widget.pastPost.passedTimeRepresentation(),
                      style: TextStyle(
                          fontSize: 12,
                          color: MyApplication.logoColor1,
                          decoration: TextDecoration.none,
                          overflow: TextOverflow.ellipsis),
                    ),
                  ),
                  Text(
                    Converter.asString(
                        this.widget.pastPost.postCreator.area.sectionName),
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
