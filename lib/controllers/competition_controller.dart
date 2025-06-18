import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:get/get.dart';

import '../models/competitions/competition.dart';
import '../models/competitions/won_price_summary.dart';
import '../models/locations/converter.dart';
import '../models/locations/supported_area.dart';
import '../models/locations/supported_town_or_institution.dart';
import '../models/users/admin.dart';
import '../models/users/alcoholic.dart';
import '../models/users/won_price_comment.dart';

import 'dart:developer' as debug;

import 'admin_controller.dart';
import 'alcoholic_controller.dart';
import 'group_controller.dart';
import 'shared_dao_functions.dart';

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

  Future<void> saveFakeWonPriceComments() async {
    List<WonPriceComment> comments;

    DocumentReference reference;

    Stream<QuerySnapshot<Map<String, dynamic>>> collectionReference =
        firestore.collection('won_prices_summaries').snapshots();

    collectionReference.forEach((wonPriceSummariesSnapshot) async {
      wonPriceSummariesSnapshot.docs.forEach((wonPriceSummaryDoc) {
        WonPriceSummary wonPriceSummary =
            WonPriceSummary.fromJson(wonPriceSummaryDoc.data());
        SupportedTownOrInstitution supportedTownOrInstitution =
            Converter.toSupportedTownOrInstitution(
                wonPriceSummary.groupArea.sectionName);
        String host = Converter.townOrInstitutionAsString(
                supportedTownOrInstitution.townOrInstitutionName)
            .toLowerCase();
        firestore
            .collection('won_prices_summaries')
            .doc(wonPriceSummaryDoc.id)
            .collection('comments')
            .snapshots()
            .forEach((commentsSnapshot) async {
          // Avoid Repeatedly Saving Same Comments
          if (commentsSnapshot.size == 0) {
            debug.log('about to add comments...');
            comments = [
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  dateCreated: DateTime(2024, 3, 1, 9, 38),
                  imageURL: '$host/alcoholics/profile_images/+27601234567.jpg',
                  username: 'Mountain Mkhize Mhlongo',
                  message: 'Nhlobo, Ayikhathali Nhlobo, Inhliziyo'),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  dateCreated: DateTime(2024, 3, 1, 9, 38),
                  imageURL: '$host/alcoholics/profile_images/+27612345678.jpg',
                  username: 'Mountain Mkhize Mhlongo',
                  message:
                      'Igijima Emaweni, Ayilali Nhlobo, Ayilambi Nhlobo, Ayikhathali Nhlobo, Inhliziyo Inhlabelela Ubusuku Nemini'),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  imageURL: '$host/alcoholics/profile_images/+27623456789.jpg',
                  username: 'Mandla',
                  dateCreated: DateTime(2025, 2, 13, 5, 13),
                  message:
                      'Nomangabe Kuyashisa Iyahlanelela, Nomangabe Kuyabanga Iyahlabelela, Nomangabe Liyaduma Lishaya Umbani Oshayisa Ngovalo Yona Ayimi Nhlobo Iyahlabelela. '),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  imageURL: '$host/alcoholics/profile_images/+27634567890.jpg',
                  username: 'Mountain Mkhize Mhlongo',
                  dateCreated: DateTime(2025, 2, 13, 23, 35),
                  message: 'Iyazi Ibhekephi Futhi Ngeke Ivinjwe Lutho'),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  dateCreated: DateTime(2025, 1, 31, 20, 12),
                  imageURL: '$host/alcoholics/profile_images/+27645678901.jpg',
                  username: 'Yebo',
                  message: 'Uloyo'),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  dateCreated: DateTime(2024, 11, 13, 12, 0),
                  imageURL: '$host/alcoholics/profile_images/+27656789012.jpg',
                  username: 'Zwe Captain',
                  message: 'Naloyo Ophuma Umphefumulo Into Yokuqala Ayisho '),
              WonPriceComment(
                  wonPriceSummaryFK: wonPriceSummaryDoc.id,
                  dateCreated: DateTime(2025, 2, 16, 23, 44),
                  imageURL: '$host/alcoholics/profile_images/+27667890123.jpg',
                  username: 'Snathi',
                  message:
                      'Uma Efika Emazulwini Uthi Nami Ngiyavuma Akekho Ongaphezulu Kwayo. Oyazi Isencane Isakhula Uthi Nami Ngiyavuma Akekho Ongaphezulu Kwayo, Oyazi Isikhulile Isizazi Ukuthi Ingubani Izokwenzani Kulomhlaba Naye Uthi Nami Ngiyavuma Akekho Ongaphezulu Kwayo, Ongakaze Ayibona Nhlobo Oyizizwa Ngendaba Naye Ucula Iculo Elifanayo Nami Ngiyavuma Akekho Ongaphezulu Kwayo.'),
            ];
            for (var commentIndex = 0;
                commentIndex < comments.length;
                commentIndex++) {
              reference = firestore
                  .collection('won_prices_summaries')
                  .doc(wonPriceSummaryDoc.id)
                  .collection('comments')
                  .doc();
              comments[commentIndex].setWonPriceCommentId(reference.id);
              await reference.set(comments[commentIndex].toJson());
            }
          }
        });
      });
      wonPriceSummariesSnapshot.docs.map((wonPriceSummaryDoc) async {});
    });
  }

  Future<void> saveWonPriceComment(
    String wonPriceSummaryFK,
    String message,
  ) async {
    // Suppose to be an xor
    if (alcoholicController.currentlyLoggedInAlcoholic == null &&
        adminController.currentlyLoggedInAdmin == null) {
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
        int two = int.parse(alcoholicController
            .currentlyLoggedInAlcoholic!.area.townOrInstitutionFK);
        bool result = one == two;

        if (result) {
          DocumentReference commentReference =
              wonPriceSummaryRef.collection('comments').doc();
          WonPriceComment? comment;
          if (alcoholicController.currentlyLoggedInAlcoholic != null) {
            comment = WonPriceComment(
                wonPriceCommentId: commentReference.id,
                wonPriceSummaryFK: wonPriceSummaryFK,
                message: message,
                imageURL: alcoholicController
                    .currentlyLoggedInAlcoholic!.profileImageURL,
                username:
                    alcoholicController.currentlyLoggedInAlcoholic!.username);
          } else if (adminController.currentlyLoggedInAdmin != null) {
            comment = WonPriceComment(
                wonPriceCommentId: commentReference.id,
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
