import '../locations/converter.dart';
import 'dart:developer' as debug;
import '../locations/section_name.dart';
import 'notification.dart';

// Branch : store_resources_crud ->  create_store_resources_store_front_end
class StoreNameInfo implements Comparable<StoreNameInfo> {
  String storeNameInfoId;
  String storeName;
  SectionName sectionName;
  String storeArea;
  String storeImageURL;
  bool canAddStoreDraw;
  late String latestStoreDrawId;
  bool isCurrentlyViewed = false;
  List<String>? drawsOrder;
  Notification? notification;

  StoreNameInfo({
    required this.storeNameInfoId,
    this.latestStoreDrawId = '-',
    required this.storeName,
    required this.sectionName,
    required this.storeArea,
    required this.storeImageURL,
    required this.canAddStoreDraw,
    this.drawsOrder = const [],
    this.notification,
  });

  factory StoreNameInfo.fromJson(dynamic json) => StoreNameInfo(
        storeNameInfoId: json['storeNameInfoId'],
        storeName: json['storeName'],
        sectionName: Converter.toSectionName(json['sectionName']),
        storeArea: json['storeArea'],
        storeImageURL: json['storeImageURL'],
        latestStoreDrawId: json['latestStoreDrawId'],
        drawsOrder: convert(json['drawsOrder']),
        canAddStoreDraw: json['canAddStoreDraw'],
        notification: json["notification"] != null
            ? Notification.fromJson(json["notification"])
            : null,
      );

  void setIsCurrentlyViewed(bool isCurrentlyViewed) {
    this.isCurrentlyViewed = isCurrentlyViewed;
  }

  @override
  int compareTo(StoreNameInfo other) {
    return other.storeArea.compareTo(storeArea);
  }

  String getCommingDrawId() {
    debug.log(drawsOrder!.toString());
    if (drawsOrder!.isNotEmpty) {
      debug.log('Next Comming Draw ${drawsOrder![0]}');
      return drawsOrder![0];
    }
    debug.log('Next Comming Draw - ');
    return "-";
  }

  static List<String>? convert(List<dynamic> list) {
    List<String>? order = [];

    for (dynamic item in list) {
      order.add(item);
    }
    order.sort();
    return order;
  }
}
