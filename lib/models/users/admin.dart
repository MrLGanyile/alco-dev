import '../locations/converter.dart';
import '../locations/town_or_institution.dart';
import 'user.dart';

class Admin extends User {
  bool isSuperiorAdmin;
  String key;
  bool isFemale;
  TownOrInstitution townOrInstitution;
  bool isBlocked;
  DateTime joinedOn;

  Admin(
      {userId,
      required phoneNumber,
      required this.joinedOn,
      this.townOrInstitution = TownOrInstitution.umlazi,
      required profileImageURL,
      required this.isFemale,
      required this.isSuperiorAdmin,
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
      'isSuperior': isSuperiorAdmin,
      'key': key,
      'isBlocked': isBlocked,
      'isFemale': isFemale,
      'townOrInstitution':
          Converter.townOrInstitutionAsString(townOrInstitution)
    });

    return map;
  }

  factory Admin.fromJson(dynamic json) => Admin(
      userId: json['userId'],
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
      isSuperiorAdmin: json['isSuperior'],
      password: json['password'],
      isBlocked: json['isBlocked'],
      key: json['key']);
}
