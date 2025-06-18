import 'package:get/get.dart';

import '../../controllers/post_controller.dart';
import '../../models/posts/past_post.dart';
import '../utils/globals.dart';

import 'package:flutter/material.dart';

import '../../main.dart';

import 'dart:developer' as debug;

import 'past_post_comments_widget.dart';
import 'single_past_post.dart';

// Branch : won_price_summary_resources_crud -> view_won_price_summaries
class ShowOffScreen extends StatelessWidget {
  ShowOffScreen({
    super.key,
  });

  PostController postController = PostController.postController;
  late Stream<List<PastPost>> pastPostsStream;

  @override
  Widget build(BuildContext context) {
    pastPostsStream = postController.readAllPastPost();
    return Container(
      height: 300,
      decoration: BoxDecoration(
        color: MyApplication.scaffoldColor,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(30),
          topRight: Radius.circular(30),
        ),
      ),
      child: StreamBuilder<List<PastPost>>(
        stream: pastPostsStream,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<PastPost> posts = snapshot.data!;
            return ListView.builder(
              itemCount: posts.length,
              itemBuilder: ((context, index) {
                return Column(
                  children: [
                    SinglePastPostWidget(pastPost: posts[index]),
                    Container(
                      margin: const EdgeInsets.only(right: 15),
                      child: Align(
                        alignment: Alignment.centerRight,
                        child: IconButton(
                          onPressed: () {
                            Get.to(() => PastPostCommentsWidgets(
                                postFK: posts[index].postId));
                          },
                          icon: Icon(
                            Icons.message,
                            size: 30,
                            color: MyApplication.logoColor1,
                          ),
                        ),
                      ),
                    )
                  ],
                );
              }),
            );
          } else if (snapshot.hasError) {
            debug.log("Error Fetching Past Post Data *** - ${snapshot.error}");
            return getCircularProgressBar();
          } else {
            return getCircularProgressBar();
          }
        },
      ),
    );
  }
}
