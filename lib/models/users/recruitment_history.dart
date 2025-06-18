class RecruitmentHistory {
  String historyId;
  String adminId;
  String action;
  bool isRefresh;
  DateTime? dateCreated;

  RecruitmentHistory(
      {required this.adminId,
      required this.historyId,
      this.isRefresh = false,
      this.dateCreated,
      required this.action});

  Map<String, dynamic> toJson() => {
        'historyId': historyId,
        'adminId': adminId,
        'action': action,
        'isRefresh': isRefresh,
        'dateCreated': null,
      };

  factory RecruitmentHistory.fromJson(dynamic json) => RecruitmentHistory(
      adminId: json['adminId'],
      historyId: json['historyId'],
      isRefresh: json['isRefresh'],
      dateCreated: DateTime(json['year'], json['month'], json['day'],
          json['hour'], json['minute']),
      action: json['action']);
}
