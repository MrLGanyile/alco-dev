import 'section_name.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

class MayvilleArea {
  static SupportedTownOrInstitution? toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName ==
            SectionName.catoCrestMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.catoManorMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.richviewMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.masxhaMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.bonelaMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.galwayMayvilleDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.nsimbiniMayvilleDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.mayville,
        townOrInstitutionNo: "5",
      );
    }

    return null;
  }

  static SupportedArea? toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.catoManorMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "32",
        );
      case SectionName.richviewMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "33",
        );
      case SectionName.masxhaMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "34",
        );
      case SectionName.bonelaMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "35",
        );
      case SectionName.nsimbiniMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "36",
        );
      case SectionName.galwayMayvilleDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "47",
        );
      default:
        return null;
    }
  }

  static SectionName? toSectionName(String section) {
    switch (section) {
      case 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.catoManorMayvilleDurbanKwaZuluNatalSouthAfrica;
      case 'Richview-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.richviewMayvilleDurbanKwaZuluNatalSouthAfrica;
      case 'Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.masxhaMayvilleDurbanKwaZuluNatalSouthAfrica;
      case 'Bonela-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.bonelaMayvilleDurbanKwaZuluNatalSouthAfrica;
      case 'Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.nsimbiniMayvilleDurbanKwaZuluNatalSouthAfrica;
      case 'Galway-Mayville-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.galwayMayvilleDurbanKwaZuluNatalSouthAfrica;
      default:
        return null;
    }
  }

  static String? asString(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.catoManorMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.richviewMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Richview-Mayville-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.masxhaMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Masxha-Mayville-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.bonelaMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Bonela-Mayville-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.nsimbiniMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.galwayMayvilleDurbanKwaZuluNatalSouthAfrica:
        return 'Galway-Mayville-Durban-Kwa Zulu Natal-South Africa';
      default:
        return null;
    }
  }
}
