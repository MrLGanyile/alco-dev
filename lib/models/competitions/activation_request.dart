import 'package:alco_dev/models/competitions/voucher_type.dart';
import 'package:alco_dev/models/converter.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ActivationRequest implements Comparable<ActivationRequest> {
  String activationRequestId;
  VoucherType voucherType;
  DateTime? requestDate;
  String groupFK;
  String? groupCreatorImageURL;
  String voucher;
  bool isApproved;
  String? approvedByAdminUserId;
  Timestamp? requestDateTimestamp;

  ActivationRequest(
      {required this.activationRequestId,
      this.approvedByAdminUserId,
      required this.voucherType,
      this.requestDate,
      this.requestDateTimestamp,
      required this.groupFK,
      this.groupCreatorImageURL,
      required this.voucher,
      this.isApproved = false});

  Map<String, dynamic> toJson() => {
        'activationRequestId': activationRequestId,
        'approvedByAdminUserId': approvedByAdminUserId,
        'voucherType': Converter.toVoucherAsString(voucherType),
        'requestDateTimestamp': requestDateTimestamp,
        'requestDate': requestDate == null
            ? null
            : {
                'year': requestDate!.year,
                'month': requestDate!.month,
                'day': requestDate!.day,
                'hour': requestDate!.hour,
                'minute': requestDate!.minute,
                'second': requestDate!.second
              },
        'isApproved': isApproved,
        'groupFK': groupFK,
        'groupCreatorImageURL': groupCreatorImageURL,
        'voucher': voucher,
      };

  void setIsApproved(isApproved) {
    this.isApproved = isApproved;
  }

  factory ActivationRequest.fromJson(dynamic json) {
    return ActivationRequest(
        activationRequestId: json['activationRequestId'],
        approvedByAdminUserId: json['approvedByAdminUserId'],
        voucherType: Converter.toVoucherType(json['voucherType']),
        requestDate: json['requestDate'] != null
            ? DateTime(
                json['requestDate']['year'],
                json['requestDate']['month'],
                json['requestDate']['day'],
                json['requestDate']['hour'],
                json['requestDate']['minute'],
                json['requestDate']['second'],
              )
            : null,
        requestDateTimestamp: json['requestDateTimestamp'],
        isApproved: json['isApproved'],
        groupFK: json['groupFK'],
        groupCreatorImageURL: json['groupCreatorImageURL'],
        voucher: json['voucher']);
  }

  @override
  int compareTo(ActivationRequest other) {
    return requestDate!.compareTo(other.requestDate!);
  }
}
