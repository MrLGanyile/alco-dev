import '/models/competitions/competition_state.dart';

import 'section_name.dart';
import '../stores/store_draw_state.dart';
import 'supported_area.dart';
import 'supported_town_or_institution.dart';
import 'town_or_institution.dart';

// groups_crud -> group_resources_crud ->  create_group_resources_front_end
class Converter {
  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static StoreDrawState toStoreDrawState(String state) {
    switch (state) {
      case "converted-to-competition":
        return StoreDrawState.convertedToCompetition;
      default:
        return StoreDrawState.notConvertedToCompetition;
    }
  }

  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static String fromStoreDrawStateToString(StoreDrawState storeDrawState) {
    switch (storeDrawState) {
      case StoreDrawState.convertedToCompetition:
        return "converted-to-competition";
      default:
        return "not-converted-to-competition";
    }
  }

  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static CompetitionState toCompetitionState(String state) {
    switch (state) {
      case "on-count-down":
        return CompetitionState.onCountDown;
      case "picking-won-grand-price":
        return CompetitionState.pickingWonGrandPrice;
      default:
        return CompetitionState.pickingWonGroup;
    }
  }

  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static String fromCompetitionStateToString(
      CompetitionState competitionState) {
    switch (competitionState) {
      case CompetitionState.onCountDown:
        return "on-count-down";
      case CompetitionState.pickingWonGrandPrice:
        return "picking-won-grand-price";
      default:
        return "picking-won-group";
    }
  }

  static SupportedTownOrInstitution toSupportedTownOrInstitution(
      SectionName sectionName) {
    if (sectionName ==
            SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.aaSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.bSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.bbSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.cSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.ccSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.dSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.eSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.fSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.gSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.hSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.jSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.kSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.lSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.mSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.nSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.pSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.qSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.rSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.sSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.uSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.vSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.wSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.malukaziUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.ySectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName ==
            SectionName.zSectionUmlaziDurbanKwaZuluNatalSouthAfrica ||
        sectionName == SectionName.philaniUmlaziDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.umlazi,
        townOrInstitutionNo: "1",
      );
    } else if (sectionName == SectionName.mutDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.mut,
        townOrInstitutionNo: "2",
      );
    } else if (sectionName == SectionName.dutDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.dut,
        townOrInstitutionNo: "3",
      );
    } else if (sectionName ==
        SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica) {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.howardUKZN,
        townOrInstitutionNo: "4",
      );
    } else if (sectionName ==
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
    } else if (sectionName ==
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
    } else {
      return SupportedTownOrInstitution(
        cityFK: "1",
        townOrInstitutionName: TownOrInstitution.durbanCentral,
        townOrInstitutionNo: "7",
      );
    }
  }

  static SupportedArea toSupportedArea(SectionName sectionName) {
    switch (sectionName) {
      // ===================Umlazi=========================
      case SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "1",
        );
      case SectionName.aaSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "2",
        );
      case SectionName.bSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "3",
        );
      case SectionName.bbSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "4",
        );
      case SectionName.cSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "5",
        );
      case SectionName.ccSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "6",
        );
      case SectionName.dSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "7",
        );
      case SectionName.eSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "8",
        );
      case SectionName.fSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "9",
        );
      case SectionName.gSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "10",
        );
      case SectionName.hSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "11",
        );
      case SectionName.jSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "12",
        );
      case SectionName.kSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "13",
        );
      case SectionName.lSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "14",
        );
      case SectionName.mSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "15",
        );
      case SectionName.nSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "16",
        );
      case SectionName.pSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "17",
        );
      case SectionName.qSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "18",
        );
      case SectionName.rSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "19",
        );
      case SectionName.sSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "20",
        );
      case SectionName.uSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "21",
        );
      case SectionName.vSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "22",
        );
      case SectionName.wSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "23",
        );
      case SectionName.malukaziUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "24",
        );
      case SectionName.philaniUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "25",
        );
      case SectionName.ySectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "26",
        );
      case SectionName.zSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "1",
          sectionName: sectionName,
          areaNo: "27",
        );

      // ===================Institutions=========================
      case SectionName.mutDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "2",
          sectionName: sectionName,
          areaNo: "28",
        );
      case SectionName.dutDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "3",
          sectionName: sectionName,
          areaNo: "29",
        );
      case SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "4",
          sectionName: sectionName,
          areaNo: "30",
        );
      // ===================Mayville=========================
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
      // ===================Sydenham=========================
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
      // ===================Durban Central=========================
      case SectionName.glenwoodDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "7",
          sectionName: sectionName,
          areaNo: "43",
        );
      case SectionName.bereaDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "7",
          sectionName: sectionName,
          areaNo: "44",
        );
      case SectionName.southBeachDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "7",
          sectionName: sectionName,
          areaNo: "45",
        );
      case SectionName.masgraveDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return SupportedArea(
          townOrInstitutionFK: "7",
          sectionName: sectionName,
          areaNo: "46",
        );
      default:
        return SupportedArea(
          townOrInstitutionFK: "5",
          sectionName: sectionName,
          areaNo: "31",
        );
    }
  }

  // Branch : supported_locations_resources_crud ->  create_supported_locations_front_end
  // Convert any section string to a section name constant.
  static SectionName toSectionName(String section) {
    switch (section) {

      // ===================Umlazi=========================
      case 'A Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'AA Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.aaSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'B Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.bSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'BB Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.bbSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'C Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.cSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'CC Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.ccSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'D Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.dSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'E Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.eSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'F Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.fSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'G Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.gSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'H Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.hSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'J Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.jSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'K Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.kSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'L Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.lSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'M Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.mSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'N Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.nSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'P Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.pSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'Q Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.qSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'R Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.rSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'S Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.sSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'U Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.uSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'V Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.vSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'W Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.wSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'Malukazi-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.malukaziUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'Y Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.ySectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'Z Section-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.zSectionUmlaziDurbanKwaZuluNatalSouthAfrica;
      case 'Philani-Umlazi-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.philaniUmlaziDurbanKwaZuluNatalSouthAfrica;

      // ===================Institutions=========================
      case 'Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.mutDurbanKwaZuluNatalSouthAfrica;
      case 'DUT-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.dutDurbanKwaZuluNatalSouthAfrica;
      case 'Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica;

      // ===================Mayville=========================
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

      // ===================Sydenham=========================
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

      // ===================Durban Central=========================
      case 'Glenwood-Durban Central-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.glenwoodDurbanCentralDurbanKwaZuluNatalSouthAfrica;
      case 'Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.bereaDurbanCentralDurbanKwaZuluNatalSouthAfrica;
      case 'South Beach-Durban Central-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.southBeachDurbanCentralDurbanKwaZuluNatalSouthAfrica;
      case 'Masgrave-Durban Central-Durban-Kwa Zulu Natal-South Africa':
        return SectionName.masgraveDurbanCentralDurbanKwaZuluNatalSouthAfrica;

      default:
        return SectionName.catoCrestMayvilleDurbanKwaZuluNatalSouthAfrica;
    }
  }

  // Branch : supported_locations_resources_crud ->  create_supported_locations_front_end
  static String asString(SectionName sectionName) {
    switch (sectionName) {
      // ===================Umlazi=========================
      case SectionName.aSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'A Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.aaSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'AA Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.bSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'B Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.bbSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'BB Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.cSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'C Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.ccSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'CC Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.dSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'D Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.eSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'E Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.fSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'F Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.gSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'G Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.hSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'H Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.jSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'J Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.kSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'K Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.lSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'L Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.mSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'M Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.nSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'N Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.pSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'P Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.qSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'Q Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.rSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'R Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.sSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'S Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.uSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'U Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.vSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'V Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.wSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'W Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.malukaziUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'Malukazi-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.ySectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'Y Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.zSectionUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'Z Section-Umlazi-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.philaniUmlaziDurbanKwaZuluNatalSouthAfrica:
        return 'Philani-Umlazi-Durban-Kwa Zulu Natal-South Africa';

      // ===================Institutions=========================
      case SectionName.mutDurbanKwaZuluNatalSouthAfrica:
        return 'Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.dutDurbanKwaZuluNatalSouthAfrica:
        return 'DUT-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.howardCollegeCampusUKZNDurbanKwaZuluNatalSouthAfrica:
        return 'Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa';

      // ===================Mayville=========================
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

      // ===================Sydenham=========================
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

      // ===================Sydenham=========================
      case SectionName.glenwoodDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return 'Glenwood-Durban Central-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.bereaDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return 'Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.southBeachDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return 'South Beach-Durban Central-Durban-Kwa Zulu Natal-South Africa';
      case SectionName.masgraveDurbanCentralDurbanKwaZuluNatalSouthAfrica:
        return 'Masgrave-Durban Central-Durban-Kwa Zulu Natal-South Africa';
      default:
        return 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa';
    }
  }

  static int townOrInstitutionAsNumber(TownOrInstitution townOrInstitution) {
    switch (townOrInstitution) {
      case TownOrInstitution.umlazi:
        return 1;
      case TownOrInstitution.mut:
        return 2;
      case TownOrInstitution.dut:
        return 3;
      case TownOrInstitution.mayville:
        return 5;
      case TownOrInstitution.sydenham:
        return 6;
      case TownOrInstitution.durbanCentral:
        return 7;
      default:
        return 4;
      // return 'Howard';
    }
  }

  static String townOrInstitutionAsString(TownOrInstitution townOrInstitution) {
    switch (townOrInstitution) {
      case TownOrInstitution.umlazi:
        return 'Umlazi';
      case TownOrInstitution.mut:
        return 'Mangosuthu (MUT)';
      case TownOrInstitution.dut:
        return 'DUT';
      case TownOrInstitution.mayville:
        return 'Mayville';
      case TownOrInstitution.sydenham:
        return 'Sydenham';
      case TownOrInstitution.durbanCentral:
        return 'Durban Central';
      default:
        return 'Howard College UKZN';
      // return 'Howard';
    }
  }

  static TownOrInstitution toTownOrInstitution(String townOrInstitution) {
    switch (townOrInstitution) {
      case 'Umlazi':
        return TownOrInstitution.umlazi;
      case 'Mangosuthu (MUT)':
        return TownOrInstitution.mut;
      case 'DUT':
        return TownOrInstitution.dut;
      case 'Mayville':
        return TownOrInstitution.mayville;
      case 'Sydenham':
        return TownOrInstitution.sydenham;
      case 'Durban Central':
        return TownOrInstitution.durbanCentral;
      default:
        return TownOrInstitution.howardUKZN;
    }
  }
}
