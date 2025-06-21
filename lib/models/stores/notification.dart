class Notification {
  String notificationId;
  List<String> audience;
  String message;
  bool forAll;
  DateTime endDate;

  Notification({
    required this.notificationId,
    required this.message,
    required this.audience,
    required this.endDate,
    this.forAll = false,
  });

  Map<String, dynamic> toJson() => {
        "notificationId": notificationId,
        "message": message,
        "audience": audience,
        'endDate': {
          "year": endDate.year,
          "month": endDate.month,
          "day": endDate.day,
        },
        "forAll": forAll
      };

  factory Notification.fromJson(dynamic json) => Notification(
      notificationId: json['notificationId'],
      message: json['message'],
      audience: convert(json['audience']),
      endDate: DateTime(
        json['endDate']['year'],
        json['endDate']['month'],
        json['endDate']['day'],
      ),
      forAll: json['forAll']);

  static List<String> convert(List<dynamic> list) {
    List<String> order = [];

    for (dynamic item in list) {
      order.add(item);
    }
    order.sort();
    return order;
  }
}
