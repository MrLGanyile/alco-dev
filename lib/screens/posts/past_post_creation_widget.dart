import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_sound/flutter_sound.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'dart:developer' as debug;

import '../../controllers/post_controller.dart';
import '../../main.dart';
import 'package:video_player/video_player.dart';

import '../utils/globals.dart';
import '../utils/start_screen.dart';

class PastPostCreationWidget extends StatefulWidget {
  PastPostCreationWidget();

  @override
  State<StatefulWidget> createState() => PastPostCreationWidgetState();
}

class PastPostCreationWidgetState extends State<PastPostCreationWidget> {
  PostController postController = PostController.postController;
  TextEditingController whereWereYouController = TextEditingController();
  TextEditingController whoWereYouWithController = TextEditingController();
  TextEditingController whatHappenedController = TextEditingController();

  // I'm not sure where to dispose these controllers.
  VideoPlayerController? whereWereYouVideoController;
  VideoPlayerController? whoWereYouWithVideoController;
  VideoPlayerController? whatHappenedVideoController;

  final whereWereYouRecorder = FlutterSoundRecorder();
  bool isWhereWereYouRecorderReady = false;

  final whoWereYouWithRecorder = FlutterSoundRecorder();
  bool isWhoWereYouWithRecorderReady = false;

  final whatHappenedRecorder = FlutterSoundRecorder();
  bool isWhatHappenedRecorderReady = false;

  double uploadIconsSize = 50;
  Color uploadIconColor = MyApplication.logoColor2;

  PastPostCreationWidgetState();

  @override
  void initState() {
    initializeRecorders();
    super.initState();
  }

  @override
  void dispose() {
    whereWereYouRecorder.closeRecorder();
    whoWereYouWithRecorder.closeRecorder();
    whatHappenedRecorder.closeRecorder();
    super.dispose();
  }

  void initializeRecorders() async {
    PermissionStatus status = await Permission.microphone.request();

    if (status != PermissionStatus.granted) {
      throw ('Microphone permission not granted');
    }

    await whereWereYouRecorder.openRecorder();
    isWhereWereYouRecorderReady = true;
    whereWereYouRecorder
        .setSubscriptionDuration(const Duration(milliseconds: 500));

    debug.log('Recorded...');

    await whoWereYouWithRecorder.openRecorder();
    isWhoWereYouWithRecorderReady = true;
    whoWereYouWithRecorder
        .setSubscriptionDuration(const Duration(milliseconds: 500));

    await whatHappenedRecorder.openRecorder();
    isWhatHappenedRecorderReady = true;
    whatHappenedRecorder
        .setSubscriptionDuration(const Duration(milliseconds: 500));
  }

  Future record(int questionIndex) async {
    String destination;
    switch (questionIndex) {
      case 0:
        destination = 'where_rec@${postController.recordersSeconds}';
        whereWereYouRecorder.startRecorder(toFile: destination);

        break;
      case 1:
        destination = 'who_rec@${postController.recordersSeconds}';
        await whoWereYouWithRecorder.startRecorder(toFile: destination);
        break;
      case 2:
        destination = 'what_rec@${postController.recordersSeconds}';
        await whatHappenedRecorder.startRecorder(toFile: destination);
    }
  }

  Future stop(int questionIndex) async {
    switch (questionIndex) {
      case 0:
        if (!isWhereWereYouRecorderReady) return;
        final path = await whereWereYouRecorder.stopRecorder();
        final audioFile = File(path!);
        debug.log('Where Were You Record Path : $audioFile');
        break;
      case 1:
        if (!isWhoWereYouWithRecorderReady) return;
        final path = await whoWereYouWithRecorder.stopRecorder();
        final audioFile = File(path!);
        debug.log('Who Were You With Record Path : $audioFile');
        break;
      case 2:
        if (!isWhatHappenedRecorderReady) return;
        final path = await whatHappenedRecorder.stopRecorder();
        final audioFile = File(path!);
        debug.log('What Happened Record Path : $audioFile');
    }
  }

  String displayRecordingTime(int seconds) {
    int numOfMinutes = seconds ~/ 60;
    int remainingSeconds = seconds % 60;

    if (numOfMinutes > 59) {
      getSnapbar('Warning', 'Recording Took Too Long');
      return "--:--";
    }

    String minutesString = "";

    if (numOfMinutes < 10) {
      minutesString += "0$numOfMinutes";
    } else {
      minutesString += numOfMinutes.toString();
    }

    String secondsString = "";

    if (remainingSeconds < 10) {
      secondsString += "0$remainingSeconds";
    } else {
      secondsString += remainingSeconds.toString();
    }

    debug.log("$minutesString:$secondsString");

    return "$minutesString:$secondsString";
  }

  Widget buildPlayIcon(bool forVideo, String url) {
    return Expanded(
      child: SizedBox(
        height: MyApplication.alarmIconFontSize,
        width: MyApplication.alarmIconFontSize,
        child: IconButton(
          onPressed: () {
            // Play record or video
            debug.log('play button pressed...');

            // Play Video On Button Click.
            if (forVideo) {
            }
            // Play Record On Button Click.
            else {}
          },
          icon: Icon(
            Icons.play_circle,
            color: MyApplication.logoColor1,
            size: MyApplication.alarmIconFontSize,
          ),
        ),
      ),
    );
  }

  Widget buildVideoDisplay(int questionNumberIndex) {
    VideoPlayer? widget;
    switch (questionNumberIndex) {
      case 0:
        if (whereWereYouVideoController != null) {
          widget = VideoPlayer(whereWereYouVideoController!);
        }
        break;
      case 1:
        if (whoWereYouWithVideoController != null) {
          widget = VideoPlayer(whoWereYouWithVideoController!);
        }
        break;
      case 2:
        if (whatHappenedVideoController != null) {
          widget = VideoPlayer(whatHappenedVideoController!);
        }
    }

    if (widget == null) return const SizedBox.square();

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

  void disposeVideoControllers() {
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

  Widget whereWereYouDisplayImage() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: AspectRatio(
        aspectRatio: 2 / 2,
        /* child: Container(
          //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
          decoration: BoxDecoration(
            color: backgroundResourcesColor,
            borderRadius: BorderRadius.circular(20),
            image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(postController.whereWereYouImageURL)),
          ),
        ), */
        child: CachedNetworkImage(
          key: UniqueKey(),
          fit: BoxFit.cover,
          imageUrl: postController.whereWereYouImageURL,
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
  }

  Widget whereWereYouDisplay() {
    // Where were you? Image Uploaded
    if (postController.whereWereYouImage != null) {
      return whereWereYouDisplayImage();
    }
    // Where were you? Voice Record Uploaded
    else if (postController.whereWereYouVoiceRecord != null &&
        postController.whereWereYouVoiceRecordURL.isNotEmpty) {
      return buildPlayIcon(false, postController.whereWereYouVoiceRecordURL);
    }
    // Where were you? Video Uploaded
    else if (postController.whereWereYouVideo != null) {
      debug.log('About to display the video.');
      whereWereYouVideoController =
          VideoPlayerController.file(postController.whereWereYouVideo!);
      whereWereYouVideoController!.initialize();
      whereWereYouVideoController!.setVolume(10);
      whereWereYouVideoController!.setLooping(false);
      return buildVideoDisplay(0);
    } else {
      // Where were you? Text Written
      return const SizedBox.shrink();
    }
  }

  Widget whereWereYouUploadIcons() {
    return Row(
      children: [
        Expanded(
          child: IconButton(
            onPressed: () {
              postController.clearForWhereWereYouImage();
              postController.captureWhereWereYouImage();
            },
            icon: const Icon(Icons.camera_alt),
            iconSize: uploadIconsSize,
            color: uploadIconColor,
          ),
        ),
        /*
        Expanded(
            child: Column(
          children: [
            IconButton(
              onPressed: () async {
                postController.clearForWhereWereYouVoiceRecord();
                // record
                if (whereWereYouRecorder.isRecording) {
                  await stop(0);
                } else {
                  await record(0);
                }
              },
              icon: Icon(
                  !whereWereYouRecorder.isRecording ? Icons.mic : Icons.stop
                  
                  ),
              iconSize: uploadIconsSize,
              color: uploadIconColor,
            ),
            StreamBuilder<RecordingDisposition>(
              stream: whereWereYouRecorder.onProgress,
              builder: (context, snapshot) {
                final duration =
                    snapshot.hasData ? snapshot.data!.duration : Duration.zero;

                return Text(
                  displayRecordingTime(duration.inSeconds),
                  style: TextStyle(color: MyApplication.attractiveColor1),
                );
              },
            ),
          ],
        )),
        */
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.clearForWhereWereYouVideo();
            postController.captureWhereWereYouVideo(ImageSource.camera);
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  Widget whoWereYouWithDisplayImage() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 15),
      child: AspectRatio(
        aspectRatio: 2 / 2,
        /*child: Container(
          //margin: EdgeInsets.symmetric(horizontal: MediaQuery.of(context).size.width/8) ,
          decoration: BoxDecoration(
            color: backgroundResourcesColor,
            borderRadius: BorderRadius.circular(20),
            image: DecorationImage(
                fit: BoxFit.cover,
                image: NetworkImage(postController.whoWereYouWithImageURL)),
          ),
        ), */
        child: CachedNetworkImage(
          key: UniqueKey(),
          fit: BoxFit.cover,
          imageUrl: postController.whoWereYouWithImageURL,
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
  }

  Widget whoWereYouWithDisplay() {
    // Who were you with? Image Uploaded
    if (postController.whoWereYouWithImage != null) {
      return whoWereYouWithDisplayImage();
    }
    // Who were you with? Voice Record Uploaded
    else if (postController.whoWereYouWithVoiceRecord != null &&
        postController.whoWereYouWithVoiceRecordURL.isNotEmpty) {
      return buildPlayIcon(false, postController.whoWereYouWithVoiceRecordURL);
    }
    // Who were you with? Video Uploaded
    else if (postController.whoWereYouWithVideo != null) {
      whoWereYouWithVideoController =
          VideoPlayerController.file(postController.whoWereYouWithVideo!);
      whoWereYouWithVideoController!.initialize();
      whoWereYouWithVideoController!.setVolume(10);
      whoWereYouWithVideoController!.setLooping(false);
      return buildVideoDisplay(1);
    } else {
      // Who were you with? Text Written
      return const SizedBox.shrink();
    }
  }

  Widget whoWereYouWithUploadIcons() {
    return Row(
      children: [
        Expanded(
          child: IconButton(
            onPressed: () {
              postController.clearForWhoWereYouWithImage();
              postController.captureWhoWereYouWithImage();
            },
            icon: const Icon(Icons.camera_alt),
            iconSize: uploadIconsSize,
            color: uploadIconColor,
          ),
        ),
        /*
        Expanded(
            child: Column(
          children: [
            IconButton(
              onPressed: () async {
                postController.clearForWhoWereYouWithVoiceRecord();
                // Record
                if (whoWereYouWithRecorder.isRecording) {
                  await stop(1);
                } else {
                  await record(1);
                }
              },
              icon: Icon(
                  !whoWereYouWithRecorder.isRecording ? Icons.mic : Icons.stop),
              iconSize: uploadIconsSize,
              color: uploadIconColor,
            ),
            StreamBuilder<RecordingDisposition>(
              stream: whoWereYouWithRecorder.onProgress,
              builder: (context, snapshot) {
                final duration =
                    snapshot.hasData ? snapshot.data!.duration : Duration.zero;

                return Text(
                  displayRecordingTime(duration.inSeconds),
                  style: TextStyle(color: MyApplication.attractiveColor1),
                );
              },
            ),
          ],
        )),
        */
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.clearForWhoWereYouWithVideo();
            postController.captureWhoWereYouWithVideo(ImageSource.camera);
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  Widget whatsHappenedDisplay() {
    // What happened? Voice Record Uploaded
    if (postController.whatHappenedVoiceRecord != null &&
        postController.whatHappenedVoiceRecordURL.isNotEmpty) {
      return buildPlayIcon(false, postController.whatHappenedVoiceRecordURL);
    }
    // What happened? Video Uploaded
    else if (postController.whatHappenedVideo != null) {
      whatHappenedVideoController =
          VideoPlayerController.file(postController.whatHappenedVideo!);
      whatHappenedVideoController!.initialize();
      whatHappenedVideoController!.setVolume(10);
      whatHappenedVideoController!.setLooping(false);

      return buildVideoDisplay(2);
    }

    // What happened? Text Written
    return const SizedBox.shrink();
  }

  Widget whatsHappenedUploadIcons() {
    return Row(
      children: [
        /*
        Expanded(
            child: Column(
          children: [
            IconButton(
              onPressed: () async {
                postController.clearForWhatHappenedVoiceRecord();
                // Record
                if (whatHappenedRecorder.isRecording) {
                  await stop(2);
                } else {
                  await record(2);
                }
              },
              icon: Icon(
                  !whatHappenedRecorder.isRecording ? Icons.mic : Icons.stop),
              iconSize: uploadIconsSize,
              color: uploadIconColor,
            ),
            StreamBuilder<RecordingDisposition>(
              stream: whatHappenedRecorder.onProgress,
              builder: (context, snapshot) {
                final duration =
                    snapshot.hasData ? snapshot.data!.duration : Duration.zero;

                return Text(
                  displayRecordingTime(duration.inSeconds),
                  style: TextStyle(color: MyApplication.attractiveColor1),
                );
              },
            ),
          ],
        )),
        */
        Expanded(
            child: IconButton(
          onPressed: () {
            postController.clearForWhatHappenedVideo();
            postController.captureWhatHappenedVideo(ImageSource.camera);
          },
          icon: const Icon(Icons.video_camera_back),
          iconSize: uploadIconsSize,
          color: uploadIconColor,
        )),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Create Post',
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
        decoration: const BoxDecoration(color: Colors.black),
        child: ListView(
          children: [
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
            retrieveTextField('Where Were You?', whereWereYouController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (_) {
              return whereWereYouDisplay();
            }),
            whereWereYouUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            retrieveTextField('Who Were You With?', whoWereYouWithController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (context) {
              return whoWereYouWithDisplay();
            }),
            whoWereYouWithUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            retrieveTextField('What Happened?', whatHappenedController),
            const SizedBox(
              height: 5,
            ),
            GetBuilder<PostController>(builder: (_) {
              return whatsHappenedDisplay();
            }),
            whatsHappenedUploadIcons(),
            const SizedBox(
              height: 5,
            ),
            // Create Post
            Container(
              width: MediaQuery.of(context).size.width,
              height: 60,
              margin: const EdgeInsets.symmetric(horizontal: 5),
              decoration: BoxDecoration(
                  color: MyApplication.logoColor1,
                  borderRadius: const BorderRadius.all(
                    Radius.circular(10),
                  )),
              child: InkWell(
                onTap: () async {
                  if (whereWereYouController.text.isNotEmpty) {
                    postController.clearForWhereWereYouText();
                    postController
                        .setWhereWereYouText(whereWereYouController.text);
                  }

                  if (whoWereYouWithController.text.isNotEmpty) {
                    postController.clearForWhoWereYouWithText();
                    postController
                        .setWhoWereYouWithText(whoWereYouWithController.text);
                  }

                  if (whatHappenedController.text.isNotEmpty) {
                    postController.clearForWhatHappenedText();
                    postController
                        .setWhatHappedText(whatHappenedController.text);
                  }

                  // Save post
                  postController.savePastPost().then(
                    (value) {
                      if (value == PastPostStatus.postSaved) {
                        // disposeVideoControllers();
                        Get.to(() => StartScreen());
                      }
                    },
                  );
                },
                child: const Center(
                  child: Text(
                    'Post',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.black,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(
              height: 5,
            ),
          ],
        ),
      )),
    );
  }
}
