import 'section_name.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

class NandaArea {
  static SupportedTownOrInstitution? toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName == SectionName.bhambayiNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.ezimangweniNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.dikweNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.mshayazafeNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.jackportNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.ohlangeNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.africaNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.congoNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.maotiNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.newtownANandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.newtownBNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.kaGNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.matendeniNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.mtshebheniNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.zinkawiniNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.tafuleniNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.ngoqokaziNandaDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.matikweNandaDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.nanda,
        townOrInstitutionNo: "8",
      );
    }
    return null;
  }

  static SupportedArea? toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.bhambayiNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "47",
        );
      case SectionName.ezimangweniNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "48",
        );
      case SectionName.dikweNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "49",
        );
      case SectionName.mshayazafeNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "50",
        );
      case SectionName.jackportNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "51",
        );
      case SectionName.ohlangeNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "52",
        );
      case SectionName.africaNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "53",
        );
      case SectionName.congoNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "54",
        );
      case SectionName.maotiNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "55",
        );
      case SectionName.newtownANandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "56",
        );
      case SectionName.newtownBNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "57",
        );
      case SectionName.kaGNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "58",
        );
      case SectionName.matendeniNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "59",
        );
      case SectionName.mtshebheniNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "60",
        );
      case SectionName.zinkawiniNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "61",
        );
      case SectionName.tafuleniNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "62",
        );
      case SectionName.ngoqokaziNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "63",
        );
      case SectionName.matikweNandaDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "8",
          sectionName: sectionName,
          areaNo: "64",
        );
      default:
        return null;
    }
  }

  static SectionName? toSectionName(String section) {
    switch (section) {
      case 'Bhambayi-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.bhambayiNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Ezimangweni-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.ezimangweniNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Dikwe-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.dikweNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Mshayazafe-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.mshayazafeNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Jackport-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.jackportNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Ohlange-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.ohlangeNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Africa-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.africaNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Congo-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.congoNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Maoti-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.maotiNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Newtown A-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.newtownANandaDurbanKwaZuluNatalSouthAfrica;
      case 'Newtown B-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.newtownBNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Ka G-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.kaGNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Matendeni-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.matendeniNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Mtshebheni-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.mtshebheniNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Zinkawini-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.zinkawiniNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Tafuleni-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.tafuleniNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Ngoqokazi-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.ngoqokaziNandaDurbanKwaZuluNatalSouthAfrica;
      case 'Matikwe-Nanda-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.matikweNandaDurbanKwaZuluNatalSouthAfrica;
      default:
        return null;
    }
  }

  static String? asString(SectionName sectionName) {
    switch (sectionName) {
      case SectionName.bhambayiNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Bhambayi-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.ezimangweniNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Ezimangweni-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.dikweNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Dikwe-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.mshayazafeNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Mshayazafe-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.jackportNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Jackport-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.ohlangeNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Ohlange-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.africaNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Africa-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.congoNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Congo-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.maotiNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Maoti-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.newtownANandaDurbanKwaZuluNatalSouthAfrica:
        return 'Newtown A-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.newtownBNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Newtown B-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.kaGNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Ka G-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.matendeniNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Matendeni-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.mtshebheniNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Mtshebheni-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.zinkawiniNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Zinkawini-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.tafuleniNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Tafuleni-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.ngoqokaziNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Ngoqokazi-Nanda-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.matikweNandaDurbanKwaZuluNatalSouthAfrica:
        return 'Matikwe-Nanda-Durban-Kwa Zulu Natal-South Africa';

      default:
        return null;
    }
  }
}
