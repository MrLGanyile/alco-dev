import '../locations/converter.dart';
import '../locations/town_or_institution.dart';
import 'user.dart';

class Admin extends User {
  bool isSuperior;
  String key;
  bool isFemale;
  TownOrInstitution townOrInstitution;
  bool isBlocked;
  DateTime joinedOn;

  Admin(
      {required phoneNumber,
      required this.joinedOn,
      this.townOrInstitution = TownOrInstitution.umlazi,
      required profileImageURL,
      required this.isFemale,
      required this.isSuperior,
      required password,
      this.isBlocked = false,
      required this.key})
      : super(
            phoneNumber: phoneNumber,
            profileImageURL: profileImageURL,
            password: password);

  @override
  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = super.toJson();

    map.addAll({
      'joinedOn': {
        'year': joinedOn.year,
        'month': joinedOn.month,
        'day': joinedOn.day
      },
      'isSuperior': isSuperior,
      'key': key,
      'isBlocked': isBlocked,
      'isFemale': isFemale,
      'townOrInstitution':
          Converter.townOrInstitutionAsString(townOrInstitution)
    });

    return map;
  }

  factory Admin.fromJson(dynamic json) => Admin(
      joinedOn: DateTime(
        json['joinedOn']['year'],
        json['joinedOn']['month'],
        json['joinedOn']['day'],
      ),
      phoneNumber: json['phoneNumber'],
      townOrInstitution:
          Converter.toTownOrInstitution(json['townOrInstitution']),
      profileImageURL: json['profileImageURL'],
      isFemale: json['isFemale'],
      isSuperior: json['isSuperior'],
      password: json['password'],
      isBlocked: json['isBlocked'],
      key: json['key']);
}
