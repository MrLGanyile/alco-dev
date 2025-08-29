// Branch : group_resources_crud ->  create_group_resources_front_end
abstract class User {
  String phoneNumber;
  String profileImageURL;
  String password;
  String userId;

  User(
      {required this.userId,
      required this.phoneNumber,
      required this.profileImageURL,
      required this.password});

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {};
    map.addAll({
      'userId': userId,
      'phoneNumber': phoneNumber,
      'profileImageURL': profileImageURL,
      'password': password,
    });
    return map;
  }
}
