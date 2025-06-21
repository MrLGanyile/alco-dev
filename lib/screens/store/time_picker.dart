import 'package:flutter/material.dart';
import '../../controllers/store_controller.dart';
import 'time_picker_helper.dart';

class TimePicker extends StatefulWidget {
  TimePicker({Key? key}) : super(key: key);

  @override
  _TimePickerState createState() => _TimePickerState();
}

class _TimePickerState extends State<TimePicker> {
  StoreController storeController = StoreController.storeController;

  @override
  Widget build(BuildContext context) =>
      TimePickerHelper(onClicked: () => pickDate(context));

  Future pickDate(BuildContext context) async {
    final drawTime =
        await showTimePicker(context: context, initialTime: TimeOfDay.now());

    if (drawTime == null) {
      return;
    }

    storeController.setTime(drawTime.hour, drawTime.minute);
  }
}
