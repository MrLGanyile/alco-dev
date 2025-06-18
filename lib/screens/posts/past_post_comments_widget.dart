import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/group_controller.dart';
import '../../controllers/post_controller.dart';
import '../../controllers/shared_dao_functions.dart';
import '../../controllers/alcoholic_controller.dart';
import '../../main.dart';
import '../../models/posts/post_comment.dart';
import '../alcoholics/alcoholic_registration_widget.dart';

import 'dart:developer' as debug;

import '../utils/globals.dart';
import 'post_comment_widget.dart';

class PastPostCommentsWidgets extends StatelessWidget {
  String postFK;
  final PostController postController = PostController.postController;
  final AlcoholicController alcoholicController =
      AlcoholicController.alcoholicController;
  final GroupController groupController = GroupController.instance;
  late List<PostComment> comments;

  PastPostCommentsWidgets({
    Key? key,
    required this.postFK,
  }) : super(key: key);

  Widget retrieveCommentTextField(BuildContext context) {
    TextEditingController controller = TextEditingController();
    return TextField(
      maxLines: 10,
      style: TextStyle(color: MyApplication.scaffoldBodyColor),
      cursorColor: MyApplication.scaffoldBodyColor,
      controller: controller,
      decoration: InputDecoration(
        labelText: 'Write Your Comment',
        helperMaxLines: 10,
        prefixIcon: Icon(Icons.comment, color: MyApplication.logoColor1),
        suffixIcon: GestureDetector(
          child: Icon(Icons.send, color: MyApplication.logoColor1),
          onTap: () {
            // Save Comment
            if (alcoholicController.currentlyLoggedInAlcoholic == null) {
              Get.to(() => AlcoholicRegistrationWidget());
            } else {
              postController.savePostComment(postFK, controller.text);
              controller.clear();
            }
          },
        ),
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text('Comments',
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
      backgroundColor: Colors.black,
      body: Column(children: [
        Expanded(
          child: StreamBuilder<List<PostComment>>(
              stream: postController.readPastPostComments(postFK),
              builder: (context, snapshot) {
                if (snapshot.hasData) {
                  comments = snapshot.data!;
                  return ListView.builder(
                      itemCount: comments.length,
                      itemBuilder: ((context, index) =>
                          PostCommentWidget(postComment: comments[index])));
                } else if (snapshot.hasError) {
                  debug.log('Error: ${snapshot.error.toString()} ');
                  return getCircularProgressBar();
                } else {
                  return getCircularProgressBar();
                }
              }),
        ),
        Container(
          height: 60,
          margin: const EdgeInsets.only(left: 15, right: 15, bottom: 15),
          child: SizedBox(height: 55, child: retrieveCommentTextField(context)),
        ),
      ]),
    );
  }
}
