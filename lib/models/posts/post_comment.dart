import '../locations/converter.dart';
import '../locations/town_or_institution.dart';

class PostComment implements Comparable<PostComment> {
  String? postCommentId;
  String postFK;
  String message;
  DateTime? dateCreated;
  String imageURL;
  String username;
  TownOrInstitution forTownOrInstitution;

  PostComment({
    this.postCommentId,
    required this.forTownOrInstitution,
    required this.postFK,
    required this.message,
    this.dateCreated,
    required this.imageURL,
    required this.username,
  });

  Map<String, dynamic> toJson() {
    dateCreated = DateTime.now();
    final map = {
      'postCommentId': postCommentId,
      'forTownOrInstitution':
          Converter.townOrInstitutionAsString(forTownOrInstitution),
      'postFK': postFK,
      'message': message,
      'dateCreated': {
        'year': dateCreated!.year,
        'month': dateCreated!.month,
        'day': dateCreated!.day,
        'hour': dateCreated!.hour,
        'minute': dateCreated!.minute
      },
      "imageURL": imageURL,
      "username": username,
    };
    return map;
  }

  factory PostComment.fromJson(dynamic json) => PostComment(
      postCommentId: json['postCommentId'],
      forTownOrInstitution:
          Converter.toTownOrInstitution(json['forTownOrInstitution']),
      postFK: json['postFK'],
      message: json['message'],
      dateCreated: DateTime(
        json['dateCreated']['year'],
        json['dateCreated']['month'],
        json['dateCreated']['day'],
        json['dateCreated']['hour'],
        json['dateCreated']['minute'],
      ),
      imageURL: json["imageURL"],
      username: json["username"]);

  void setPostCommentId(String commentId) {
    postCommentId = commentId;
  }

  String passedTimeRepresentation() {
    Duration duration = dateCreated!.difference(DateTime.now());

    String passedTimeRepresentation;
    if (duration.inMinutes.abs() <= 1) {
      passedTimeRepresentation = 'now';
    } else if (duration.inMinutes.abs() <= 59) {
      passedTimeRepresentation = '${duration.inMinutes.abs()}mins';
    } else if (duration.inMinutes.abs() < 120) {
      passedTimeRepresentation = '1h';
    } else if (duration.inMinutes.abs() < 60 * 24) {
      passedTimeRepresentation = '${duration.inHours.abs()}h';
    } else if (duration.inMinutes.abs() < 60 * 24 * 7) {
      passedTimeRepresentation = '${duration.inDays.abs()}d';
    } else if (duration.inMinutes.abs() < 60 * 24 * 7 * 4) {
      passedTimeRepresentation = '${duration.inDays.abs() ~/ 7}w';
    } else if (duration.inMinutes.abs() < (60 * 24 * 7 * 4)) {
      passedTimeRepresentation =
          '${duration.inMinutes.abs() ~/ (60 * 24 * 7 * 4)}mo';
    } else if (duration.inMinutes.abs() < (60 * 24 * 7 * 4 * 24)) {
      passedTimeRepresentation =
          '${duration.inMinutes.abs() ~/ (60 * 24 * 7 * 4 * 12)}yr';
    } else {
      passedTimeRepresentation =
          '${duration.inMinutes.abs() ~/ (60 * 24 * 7 * 4 * 12)}yrs';
    }

    return passedTimeRepresentation;
  }

  @override
  int compareTo(PostComment other) {
    return dateCreated!.compareTo(other.dateCreated!);
  }
}
