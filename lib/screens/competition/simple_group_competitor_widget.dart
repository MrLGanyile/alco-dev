import 'package:alco_dev/main.dart';
import 'package:flutter/material.dart';

import '../../models/converter.dart';
import '../../models/users/group.dart';
import 'dart:developer' as debug;

class SimpleGroupCompetitorWidget extends StatelessWidget {
  Group group;

  SimpleGroupCompetitorWidget({required this.group});

  String getAreaName() {
    String sectionName = Converter.asString(group.groupArea.sectionName);
    String areaName = sectionName.substring(0, sectionName.indexOf('-'));
    debug.log('Group Area Name : $areaName');

    return areaName;
  }

  @override
  Widget build(BuildContext context) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 10.0, horizontal: 5),
        child: Center(
          child: Column(
            children: [
              !Converter.isInstitution(group.groupArea.sectionName)
                  ? const SizedBox.shrink()
                  : Text(
                      group.groupName,
                      style: TextStyle(
                        fontSize: 20,
                        color: MyApplication.logoColor2,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
              Text(
                group.groupSpecificArea!,
                style: TextStyle(
                  fontSize: 20,
                  color: MyApplication.logoColor1,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Converter.isInstitution(group.groupArea.sectionName)
                  ? const SizedBox.shrink()
                  : Text(
                      Converter.isInstitution(group.groupArea.sectionName)
                          ? group.groupSpecificArea!
                          : getAreaName(),
                      style: TextStyle(
                        fontSize: 20,
                        color: MyApplication.logoColor2,
                        fontWeight: FontWeight.bold,
                      ),
                    )
            ],
          ),
        ),
      );
}
