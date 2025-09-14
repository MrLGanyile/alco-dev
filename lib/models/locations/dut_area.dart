import 'section_name.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

class DutArea {
  static SupportedTownOrInstitution? toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName == SectionName.dutDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.dut,
        townOrInstitutionNo: "3",
      );
    }
    return null;
  }

  static SupportedArea? toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.dutDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "3",
          sectionName: sectionName,
          areaNo: "29",
        );
      default:
        return null;
    }
  }

  static SectionName? toSectionName(String section) {
    switch (section) {
      case 'DUT-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.dutDurbanKwaZuluNatalSouthAfrica;
      default:
        return null;
    }
  }

  static String? asString(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.dutDurbanKwaZuluNatalSouthAfrica:
        return 'DUT-Durban-Kwa Zulu Natal-South Africa';
      default:
        return null;
    }
  }
}
