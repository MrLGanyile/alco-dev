import '../users/alcoholic.dart';

class PastPost implements Comparable<PastPost> {
  String postId;
  Alcoholic postCreator;
  DateTime? dateCreated;

  String whereWereYouText;
  String whereWereYouImageURL;
  String whereWereYouVoiceRecordURL;
  String whereWereYouVideoURL;

  String whoWereYouWithText;
  String whoWereYouWithImageURL;
  String whoWereYouWithVoiceRecordURL;
  String whoWereYouWithVideoURL;

  String whatHappenedText;
  String whatHappenedVoiceRecordURL;
  String whatHappenedVideoURL;

  PastPost(
      {required this.postId,
      required this.postCreator,
      this.dateCreated,
      this.whereWereYouImageURL = '',
      this.whereWereYouText = '',
      this.whereWereYouVoiceRecordURL = '',
      this.whereWereYouVideoURL = '',
      this.whoWereYouWithText = '',
      this.whoWereYouWithImageURL = '',
      this.whoWereYouWithVoiceRecordURL = '',
      this.whoWereYouWithVideoURL = '',
      this.whatHappenedText = '',
      this.whatHappenedVoiceRecordURL = '',
      this.whatHappenedVideoURL = ''});

  Map<String, dynamic> toJson() => {
        'postId': postId,
        'postCreator': postCreator.toJson(),
        'dateCreated': {
          'year': dateCreated!.year,
          'month': dateCreated!.month,
          'date': dateCreated!.day,
          'hour': dateCreated!.hour,
          'minute': dateCreated!.minute
        },
        'whereWereYouText': whereWereYouText,
        'whereWereYouImageURL': whereWereYouImageURL,
        'whereWereYouVoiceRecordURL': whereWereYouVoiceRecordURL,
        'whereWereYouVideoURL': whereWereYouVideoURL,
        'whoWereYouWithText': whoWereYouWithText,
        'whoWereYouWithImageURL': whoWereYouWithImageURL,
        'whoWereYouWithVoiceRecordURL': whoWereYouWithVoiceRecordURL,
        'whoWereYouWithVideoURL': whoWereYouWithVideoURL,
        'whatHappenedText': whatHappenedText,
        'whatHappenedVoiceRecordURL': whatHappenedVoiceRecordURL,
        'whatHappenedVideoURL': whatHappenedVideoURL
      };

  factory PastPost.fromJson(dynamic json) => PastPost(
        postId: json['postId'],
        postCreator: Alcoholic.fromJson(json['postCreator']),
        dateCreated: DateTime(
          json['dateCreated']['year'],
          json['dateCreated']['month'],
          json['dateCreated']['date'],
          json['dateCreated']['hour'],
          json['dateCreated']['minute'],
        ),
        whereWereYouText: json['whereWereYouText'],
        whereWereYouImageURL: json['whereWereYouImageURL'],
        whereWereYouVoiceRecordURL: json['whereWereYouVoiceRecordURL'],
        whereWereYouVideoURL: json['whereWereYouVideoURL'],
        whoWereYouWithText: json['whoWereYouWithText'],
        whoWereYouWithImageURL: json['whoWereYouWithImageURL'],
        whoWereYouWithVoiceRecordURL: json['whoWereYouWithVoiceRecordURL'],
        whoWereYouWithVideoURL: json['whoWereYouWithVideoURL'],
        whatHappenedText: json['whatHappenedText'],
        whatHappenedVoiceRecordURL: json['whatHappenedVoiceRecordURL'],
        whatHappenedVideoURL: json['whatHappenedVideoURL'],
      );

  bool hasWhereWereYouText() {
    return whereWereYouText.isNotEmpty;
  }

  bool hasWhereWereYouImage() {
    return whereWereYouImageURL.isNotEmpty;
  }

  bool hasWhereWereYouVoiceRecord() {
    return whereWereYouVoiceRecordURL.isNotEmpty;
  }

  bool hasWhereWereYouVideo() {
    return whereWereYouVideoURL.isNotEmpty;
  }

  bool hasWhoWereYouWithText() {
    return whoWereYouWithText.isNotEmpty;
  }

  bool hasWhoWereYouWithImage() {
    return whoWereYouWithImageURL.isNotEmpty;
  }

  bool hasWhoWereYouWithVoiceRecord() {
    return whoWereYouWithVoiceRecordURL.isNotEmpty;
  }

  bool hasWhoWereYouWithVideo() {
    return whoWereYouWithVideoURL.isNotEmpty;
  }

  bool hasWhatHappenedText() {
    return whatHappenedText.isNotEmpty;
  }

  bool hasWhatHappenedVoiceRecord() {
    return whatHappenedVoiceRecordURL.isNotEmpty;
  }

  bool hasWhatHappenedVideo() {
    return whatHappenedVideoURL.isNotEmpty;
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
  int compareTo(PastPost other) {
    return other.dateCreated!.compareTo(dateCreated!);
  }
}
