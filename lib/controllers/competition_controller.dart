import '../../models/locations/town_or_institution.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';

import '../models/competitions/won_price_summary.dart';
import '../models/converter.dart';
import '../models/locations/supported_town_or_institution.dart';
import '../models/users/admin.dart';
import '../models/users/alcoholic.dart';
import '../models/users/user.dart' as my;
import '../models/users/won_price_comment.dart';

import 'dart:developer' as debug;

import '../screens/utils/globals.dart';
import 'admin_controller.dart';
import 'alcoholic_controller.dart';
import 'group_controller.dart';
import 'shared_resources_controller.dart';

// Branch : competition_resources_crud ->  competitions_data_access
class CompetitionController extends GetxController {
  FirebaseFirestore firestore;
  FirebaseFunctions functions;
  Reference storage;
  FirebaseAuth auth;

  CompetitionController({
    required this.firestore,
    required this.storage,
    required this.functions,
    required this.auth,
  });

  static CompetitionController competitionController = Get.find();
  GroupController groupController = GroupController.instance;
  AlcoholicController alcoholicController =
      AlcoholicController.alcoholicController;
  AdminController adminController = AdminController.adminController;

  // Branch : won_price_summary_resources_crud ->  won_price_summary_resources_data_access
  Stream<List<WonPriceSummary>> readAllWonPriceSummaries() =>
      FirebaseFirestore.instance
          .collection('won_prices_summaries')
          .snapshots()
          .map((wonPriceSummariesSnapshot) {
        List<WonPriceSummary> list =
            wonPriceSummariesSnapshot.docs.map((wonPriceSummaryDoc) {
          WonPriceSummary wonPriceSummary =
              WonPriceSummary.fromJson(wonPriceSummaryDoc.data());
          return wonPriceSummary;
        }).toList();
        list.sort();
        return list;
      });

  // Branch : competition_resources_crud ->  competitions_data_access
  Stream<DocumentSnapshot>? findCompetition(String competitionId) {
    return FirebaseFirestore.instance
        .collection('competitions')
        .doc(competitionId)
        .snapshots();
  }

  // Branch : competition_resources_crud ->  competitions_data_access

  // Branch : competition_resources_crud ->  competitions_data_access
  Stream<DocumentSnapshot<Object?>> retrieveCountDownClock(
      String countDownClockId) {
    DocumentReference reference = FirebaseFirestore.instance
        .collection('count_down_clocks')
        .doc(countDownClockId);

    return reference.snapshots();
  }

  Stream<List<WonPriceComment>> readWonPriceComments(
          String wonPriceSummaryFK) =>
      firestore
          .collection('won_prices_summaries')
          .doc(wonPriceSummaryFK)
          .collection('comments')
          .snapshots()
          .map((commentsSnapshot) {
        List<WonPriceComment> list = commentsSnapshot.docs.map((commentDoc) {
          WonPriceComment comment = WonPriceComment.fromJson(commentDoc.data());
          return comment;
        }).toList();
        list.sort();
        return list;
      });

  Future<void> saveWonPriceComment(
    String wonPriceSummaryFK,
    String message,
  ) async {
    my.User? user = getCurrentlyLoggenInUser();

    if (user == null) {
      getSnapbar('Unauthorized Action', 'Login Before Commenting');
      return;
    }

    DocumentReference wonPriceSummaryRef =
        firestore.collection('won_prices_summaries').doc(wonPriceSummaryFK);

    wonPriceSummaryRef.get().then((wonPriceSummaryDoc) async {
      if (wonPriceSummaryDoc.exists) {
        WonPriceSummary wonPriceSummary =
            WonPriceSummary.fromJson(wonPriceSummaryDoc.data());

        int one =
            int.parse(wonPriceSummary.townOrInstitution.townOrInstitutionNo);
        int two;

        TownOrInstitution townOrInstitution;
        if (user is Alcoholic) {
          townOrInstitution =
              Converter.toSupportedTownOrInstitution(user.area.sectionName)
                  .townOrInstitutionName;
          two = int.parse(alcoholicController
              .currentlyLoggedInAlcoholic!.area.townOrInstitutionFK);
        } else {
          townOrInstitution = (user as Admin).townOrInstitution;
          two = Converter.townOrInstitutionAsNumber(
              adminController.currentlyLoggedInAdmin!.townOrInstitution);
        }

        bool result = one == two;

        if (result) {
          DocumentReference commentReference =
              wonPriceSummaryRef.collection('comments').doc();
          WonPriceComment? comment;
          if (alcoholicController.currentlyLoggedInAlcoholic != null) {
            comment = WonPriceComment(
                creatorPhoneNumber:
                    alcoholicController.currentlyLoggedInAlcoholic!.phoneNumber,
                wonPriceCommentId: commentReference.id,
                forTownOrInstitution: townOrInstitution,
                wonPriceSummaryFK: wonPriceSummaryFK,
                message: message,
                imageURL: alcoholicController
                    .currentlyLoggedInAlcoholic!.profileImageURL,
                username:
                    alcoholicController.currentlyLoggedInAlcoholic!.username);
          } else if (adminController.currentlyLoggedInAdmin != null) {
            comment = WonPriceComment(
                creatorPhoneNumber:
                    alcoholicController.currentlyLoggedInAlcoholic!.phoneNumber,
                wonPriceCommentId: commentReference.id,
                forTownOrInstitution: townOrInstitution,
                wonPriceSummaryFK: wonPriceSummaryFK,
                message: message,
                imageURL:
                    adminController.currentlyLoggedInAdmin!.profileImageURL,
                username: 'Admin');
          }

          await commentReference.set(comment!.toJson());
        } else {
          String host = Converter.townOrInstitutionAsString(
              wonPriceSummary.townOrInstitution.townOrInstitutionName);
          Get.snackbar('Error', 'Only $host Users May Comment.');
        }
      }
    });
  }
}
