import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/group_controller.dart';
import '../../controllers/store_controller.dart';
import '../../main.dart';

import 'dart:developer' as debug;

import '../groups/groups_screen.dart';
import '../utils/globals.dart';
import '../utils/page_navigation.dart';

class DrawGrandPriceCreationWidget extends StatefulWidget {
  TextEditingController descriptionController;
  int grandPriceIndex;

  DrawGrandPriceCreationWidget({
    required this.descriptionController,
    required this.grandPriceIndex,
  });

  @override
  State createState() => DrawGrandPriceCreationWidgetState();
}

class DrawGrandPriceCreationWidgetState
    extends State<DrawGrandPriceCreationWidget> {
  GroupController groupController = GroupController.instance;
  StoreController storeController = StoreController.storeController;
  DrawGrandPriceCreationWidgetState();

  @override
  Widget build(BuildContext context) => Container(
        margin: const EdgeInsets.only(bottom: 5),
        child: Column(
          children: [
            showPickedPrice(),
            const SizedBox(
              height: 10,
            ),
            singlePricePicker(),
            const SizedBox(
              height: 10,
            ),
            TextField(
              minLines: 1,
              maxLines: 10,
              style: TextStyle(color: MyApplication.logoColor1),
              cursorColor: MyApplication.logoColor1,
              controller: widget.descriptionController,
              decoration: InputDecoration(
                labelText: 'Description ${widget.grandPriceIndex + 1}',
                /*prefixIcon:
                    Icon(Icons.description, color: MyApplication.logoColor1),*/
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
            const SizedBox(
              height: 10,
            ),
          ],
        ),
      );

  Widget showPickedPrice() {
    switch (widget.grandPriceIndex) {
      case 0:
        return GetBuilder<StoreController>(builder: (_) {
          return storeController.grandPrice1ImageURL!.isEmpty ||
                  storeController.drawGrandPrice1ImageFile == null
              ? const SizedBox.shrink()
              : Center(
                  /*child: Container(
                    height: 90,
                    width: 90,
                    decoration: BoxDecoration(
                      color: backgroundResourcesColor,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image:
                            NetworkImage(storeController.grandPrice1ImageURL!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ), */
                  child: CachedNetworkImage(
                    key: UniqueKey(),
                    fit: BoxFit.cover,
                    imageUrl: storeController.grandPrice1ImageURL!,
                    fadeOutCurve: Curves.easeOutExpo,
                    imageBuilder: (c, provider) {
                      return Container(
                        height: 90,
                        width: 90,
                        decoration: BoxDecoration(
                          color: backgroundResourcesColor,
                          borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(
                            image: provider,
                            fit: BoxFit.cover,
                          ),
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
                );
        });
      case 1:
        return GetBuilder<StoreController>(builder: (_) {
          return storeController.grandPrice2ImageURL!.isEmpty ||
                  storeController.drawGrandPrice2ImageFile == null
              ? const SizedBox.shrink()
              : Center(
                  /*child: Container(
                    height: 90,
                    width: 90,
                    decoration: BoxDecoration(
                      color: backgroundResourcesColor,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image:
                            NetworkImage(storeController.grandPrice2ImageURL!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ), */
                  child: CachedNetworkImage(
                    key: UniqueKey(),
                    fit: BoxFit.cover,
                    imageUrl: storeController.grandPrice2ImageURL!,
                    fadeOutCurve: Curves.easeOutExpo,
                    imageBuilder: (c, provider) {
                      return Container(
                        height: 90,
                        width: 90,
                        decoration: BoxDecoration(
                          color: backgroundResourcesColor,
                          borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(
                            image: provider,
                            fit: BoxFit.cover,
                          ),
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
                );
        });
      case 2:
        return GetBuilder<StoreController>(builder: (_) {
          return storeController.grandPrice3ImageURL!.isEmpty ||
                  storeController.drawGrandPrice3ImageFile == null
              ? const SizedBox.shrink()
              : Center(
                  /*child: Container(
                    height: 90,
                    width: 90,
                    decoration: BoxDecoration(
                      color: backgroundResourcesColor,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image:
                            NetworkImage(storeController.grandPrice3ImageURL!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ), */
                  child: CachedNetworkImage(
                    key: UniqueKey(),
                    fit: BoxFit.cover,
                    imageUrl: storeController.grandPrice3ImageURL!,
                    fadeOutCurve: Curves.easeOutExpo,
                    imageBuilder: (c, provider) {
                      return Container(
                        height: 90,
                        width: 90,
                        decoration: BoxDecoration(
                          color: backgroundResourcesColor,
                          borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(
                            image: provider,
                            fit: BoxFit.cover,
                          ),
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
                );
        });
      case 3:
        return GetBuilder<StoreController>(builder: (_) {
          return storeController.grandPrice4ImageURL!.isEmpty ||
                  storeController.drawGrandPrice4ImageFile == null
              ? const SizedBox.shrink()
              : Center(
                  /*child: Container(
                    height: 90,
                    width: 90,
                    decoration: BoxDecoration(
                      color: backgroundResourcesColor,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image:
                            NetworkImage(storeController.grandPrice4ImageURL!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ), */
                  child: CachedNetworkImage(
                    key: UniqueKey(),
                    fit: BoxFit.cover,
                    imageUrl: storeController.grandPrice4ImageURL!,
                    fadeOutCurve: Curves.easeOutExpo,
                    imageBuilder: (c, provider) {
                      return Container(
                        height: 90,
                        width: 90,
                        decoration: BoxDecoration(
                          color: backgroundResourcesColor,
                          borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(
                            image: provider,
                            fit: BoxFit.cover,
                          ),
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
                );
        });
      default:
        return GetBuilder<StoreController>(builder: (_) {
          return storeController.grandPrice5ImageURL!.isEmpty ||
                  storeController.drawGrandPrice5ImageFile == null
              ? const SizedBox.shrink()
              : Center(
                  /* child: Container(
                    height: 90,
                    width: 90,
                    decoration: BoxDecoration(
                      color: backgroundResourcesColor,
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image:
                            NetworkImage(storeController.grandPrice5ImageURL!),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ), */
                  child: CachedNetworkImage(
                    key: UniqueKey(),
                    fit: BoxFit.cover,
                    imageUrl: storeController.grandPrice5ImageURL!,
                    fadeOutCurve: Curves.easeOutExpo,
                    imageBuilder: (c, provider) {
                      return Container(
                        height: 90,
                        width: 90,
                        decoration: BoxDecoration(
                          color: backgroundResourcesColor,
                          borderRadius: BorderRadius.circular(20),
                          image: DecorationImage(
                            image: provider,
                            fit: BoxFit.cover,
                          ),
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
                );
        });
    }
  }

  Widget singlePricePicker() => Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Download Icon
          Expanded(
            child: IconButton(
              color: Colors.white,
              iconSize: MediaQuery.of(context).size.width * 0.15,
              icon: Icon(Icons.download, color: MyApplication.logoColor1),
              onPressed: () async {
                debug.log(
                    'drawGrandPrice Index ${widget.grandPriceIndex} Description ${widget.descriptionController.text}');
              },
            ),
          ),
          // Camera Icon
          Expanded(
            child: IconButton(
              color: Colors.white,
              iconSize: MediaQuery.of(context).size.width * 0.15,
              icon: Icon(Icons.camera_alt, color: MyApplication.logoColor2),
              onPressed: () async {
                storeController.captureGrandPriceImageFromCamera(
                  widget.grandPriceIndex,
                );
              },
            ),
          ),
          // Upload Icon
          Expanded(
            child: IconButton(
                color: Colors.white,
                iconSize: MediaQuery.of(context).size.width * 0.15,
                icon: Icon(Icons.upload, color: MyApplication.logoColor1),
                onPressed: () async {
                  storeController.chooseGrandPriceImageFromGallery(
                    widget.grandPriceIndex,
                  );
                }),
          ),
        ],
      );
}
