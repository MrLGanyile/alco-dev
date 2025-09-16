import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';

import '../../controllers/group_controller.dart';
import '../../main.dart';
import '../../models/competitions/activation_request.dart';
import '../../models/converter.dart';
import '../utils/globals.dart';
import 'dart:developer' as debug;

class VouchersWidget extends StatelessWidget {
  GroupController groupController = GroupController.instance;
  late Stream<List<ActivationRequest>> activationRequestsStream =
      groupController.readNotApprovedActivationRequestsForPast7Days();

  Widget activationRequestInfo(ActivationRequest request) => Container(
        margin: const EdgeInsets.only(left: 5, right: 5, bottom: 2),
        child: Container(
          margin: const EdgeInsets.only(left: 5),
          child: Row(
            children: [
              Text(
                request.groupFK,
                style: TextStyle(
                    fontSize: listTileText1FontSize,
                    color: MyApplication.logoColor2,
                    decoration: TextDecoration.none,
                    overflow: TextOverflow.ellipsis),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                request.voucher,
                style: TextStyle(
                    fontSize: listTileText1FontSize,
                    color: MyApplication.attractiveColor1,
                    decoration: TextDecoration.none,
                    overflow: TextOverflow.ellipsis),
              ),
              const SizedBox(
                width: 5,
              ),
              Text(
                Converter.toVoucherAsString(request.voucherType),
                style: TextStyle(
                    fontSize: listTileText1FontSize,
                    color: MyApplication.logoColor1,
                    decoration: TextDecoration.none,
                    overflow: TextOverflow.ellipsis),
              )
            ],
          ),
        ),
      );

  @override
  Widget build(BuildContext context) => Column(children: [
        const SizedBox(
          height: 5,
        ),
        Expanded(
          child: StreamBuilder<List<ActivationRequest>>(
              stream: groupController
                  .readNotApprovedActivationRequestsForPast7Days(),
              builder: ((context, snapshot) {
                if (snapshot.hasData) {
                  List<ActivationRequest> activationRequests =
                      snapshot.data as List<ActivationRequest>;
                  return ListView.builder(
                      itemCount: activationRequests.length,
                      itemBuilder: ((context, index) {
                        return activationRequestInfo(activationRequests[index]);
                      }));
                } else if (snapshot.hasError) {
                  debug.log('Error Activation Request Data ${snapshot.error}');
                  return getCircularProgressBar();
                } else {
                  return getCircularProgressBar();
                }
              })),
        ),
      ]);
}
