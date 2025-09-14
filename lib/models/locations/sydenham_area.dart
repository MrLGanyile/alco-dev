import 'section_name.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

class SydenhamArea {
  static SupportedTownOrInstitution? toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName ==
            SectionName.sydenhamHeightSydenhamDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.burnwoodSydenhamDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.kennedySydenhamDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.foremanSydenhamDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.threeRandSydenhamDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.palmetSydenhamDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.sydenham,
        townOrInstitutionNo: "6",
      );
    }
    return null;
  }

  static SupportedArea? toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.foremanSydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "37",
        );
      case SectionName.kennedySydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "38",
        );
      case SectionName.burnwoodSydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "39",
        );
      case SectionName.palmetSydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "40",
        );
      case SectionName.sydenhamHeightSydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "41",
        );
      case SectionName.threeRandSydenhamDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "6",
          sectionName: sectionName,
          areaNo: "42",
        );
      default:
        return null;
    }
  }

  static SectionName? toSectionName(String section) {
    switch (section) {
      case 'Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.foremanSydenhamDurbanKwaZuluNatalSouthAfrica;

      case 'Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.burnwoodSydenhamDurbanKwaZuluNatalSouthAfrica;

      case 'Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.kennedySydenhamDurbanKwaZuluNatalSouthAfrica;

      case 'Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.palmetSydenhamDurbanKwaZuluNatalSouthAfrica;

      case 'Sydenham Height-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.sydenhamHeightSydenhamDurbanKwaZuluNatalSouthAfrica;

      case '3 Rand-Sydenham-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.threeRandSydenhamDurbanKwaZuluNatalSouthAfrica;

      default:
        return null;
    }
  }

  static String? asString(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.foremanSydenhamDurbanKwaZuluNatalSouthAfrica:
        return 'Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.burnwoodSydenhamDurbanKwaZuluNatalSouthAfrica:
        return 'Burnwood-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.kennedySydenhamDurbanKwaZuluNatalSouthAfrica:
        return 'Kennedy-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.palmetSydenhamDurbanKwaZuluNatalSouthAfrica:
        return 'Palmet-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.sydenhamHeightSydenhamDurbanKwaZuluNatalSouthAfrica:
        return 'Sydenham Height-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.threeRandSydenhamDurbanKwaZuluNatalSouthAfrica:
        return '3 Rand-Sydenham-Durban-Kwa Zulu Natal-South Africa';
      default:
        return null;
    }
  }
}
