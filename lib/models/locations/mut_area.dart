import 'section_name.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

class MutArea {
  static SupportedTownOrInstitution? toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName == SectionName.mutDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.mut,
        townOrInstitutionNo: "2",
      );
    }
    return null;
  }

  static SupportedArea? toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.mutDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "2",
          sectionName: sectionName,
          areaNo: "28",
        );
      default:
        return null;
    }
  }

  static SectionName? toSectionName(String section) {
    switch (section) {
      case 'Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.mutDurbanKwaZuluNatalSouthAfrica;
      default:
        return null;
    }
  }

  static String? asString(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.mutDurbanKwaZuluNatalSouthAfrica:
        return 'Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa';
      default:
        return null;
    }
  }
}
