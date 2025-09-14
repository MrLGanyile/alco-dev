import 'package:alco_dev/models/competitions/voucher_type.dart';
import 'package:alco_dev/models/locations/durban_central_area.dart';
import 'package:alco_dev/models/locations/mayville_area.dart';
import 'package:alco_dev/models/locations/nanda_area.dart';
import 'package:alco_dev/models/locations/sydenham_area.dart';
import 'package:alco_dev/models/locations/umlazi_area.dart';
import 'package:alco_dev/models/users/admin.dart';

import '/models/competitions/competition_state.dart';

import 'locations/dut_area.dart';
import 'locations/howard_area.dart';
import 'locations/mut_area.dart';
import 'locations/section_name.dart';
import 'hosting areas/hosted_draw_state.dart';
import 'locations/supported_area.dart';
import 'locations/supported_town_or_institution.dart';
import 'locations/town_or_institution.dart';

// groups_crud -> group_resources_crud ->  create_group_resources_front_end
class Converter {
  static String toAdminTypeAsString(AdminType adminType) {
    switch (adminType) {
      case AdminType.groupRegistery:
        return 'Group Registery';
      case AdminType.moneyCollector:
        return 'Money Collector';
      default:
        return 'Both';
    }
  }

  static AdminType toAdminType(String adminType) {
    switch (adminType) {
      case 'Group Registery':
        return AdminType.groupRegistery;
      case 'Money Collector':
        return AdminType.moneyCollector;

      default:
        return AdminType.groupRegisteryAndmoneyCollector;
    }
  }

  static String toVoucherAsString(VoucherType voucherType) {
    switch (voucherType) {
      case VoucherType.blueVoucher:
        return 'Blue Voucher';
      case VoucherType.easyload:
        return 'Easy Load';
      case VoucherType.easypay:
        return 'Easy Pay';
      case VoucherType.oneVoucher:
        return '1Voucher';
      default:
        return 'OTT';
    }
  }

  static toVoucherType(String voucherType) {
    switch (voucherType) {
      case 'Blue Voucher':
        return VoucherType.blueVoucher;
      case 'Easy Load':
        return VoucherType.easyload;
      case 'Easy Pay':
        return VoucherType.easypay;
      case '1Voucher':
        return VoucherType.oneVoucher;
      default:
        return VoucherType.ott;
    }
  }

  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static HostedDrawState toHostedDrawState(String state) {
    switch (state) {
      case "converted-to-competition":
        return HostedDrawState.convertedToCompetition;
      default:
        return HostedDrawState.notConvertedToCompetition;
    }
  }

  // Branch : competition_resources_crud ->  create_competition_resources_front_end
  static String fromHostedDrawStateToString(HostedDrawState storeDrawState) {
    switch (storeDrawState) {
      case HostedDrawState.convertedToCompetition:
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

  // Default Mayville
  static SupportedTownOrInstitution toSupportedTownOrInstitution(
      SectionName sectionName) {
    SupportedTownOrInstitution? supportedTownOrInstitution =
        UmlaziArea.toSupportedTownOrInstitution(sectionName);

    supportedTownOrInstitution ??=
        MutArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        DutArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        HowardArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        MayvilleArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        SydenhamArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        DurbanCentralArea.toSupportedTownOrInstitution(sectionName);
    supportedTownOrInstitution ??=
        NandaArea.toSupportedTownOrInstitution(sectionName);

    supportedTownOrInstitution ??= SupportedTownOrInstitution(
      cityFK: "1",
      townOrInstitutionName: TownOrInstitution.mayville,
      townOrInstitutionNo: "5",
    );

    return supportedTownOrInstitution;
  }

  // Default Mayville [Cato Crest]
  static SupportedArea toSupportedArea(SectionName sectionName) {
    SupportedArea? supportedArea = UmlaziArea.toSupportedArea(sectionName);

    supportedArea ??= MutArea.toSupportedArea(sectionName);
    supportedArea ??= DutArea.toSupportedArea(sectionName);
    supportedArea ??= HowardArea.toSupportedArea(sectionName);
    supportedArea ??= MayvilleArea.toSupportedArea(sectionName);
    supportedArea ??= SydenhamArea.toSupportedArea(sectionName);
    supportedArea ??= DurbanCentralArea.toSupportedArea(sectionName);
    supportedArea ??= NandaArea.toSupportedArea(sectionName);

    supportedArea ??= SupportedArea(
      townOrInstitutionFK: "5",
      sectionName: sectionName,
      areaNo: "31",
    );

    return supportedArea;
  }

  // Default Cato Crest
  static SectionName toSectionName(String section) {
    SectionName? sectionName = UmlaziArea.toSectionName(section);

    sectionName ??= MutArea.toSectionName(section);
    sectionName ??= DutArea.toSectionName(section);
    sectionName ??= HowardArea.toSectionName(section);
    sectionName ??= MayvilleArea.toSectionName(section);
    sectionName ??= SydenhamArea.toSectionName(section);
    sectionName ??= DurbanCentralArea.toSectionName(section);
    sectionName ??= NandaArea.toSectionName(section);

    sectionName ??= SectionName.catoCrestMayvilleDurbanKwaZuluNatalSouthAfrica;
    return sectionName;
  }

  // Default Cato Crest
  static String asString(SectionName sectionName) {
    String? section = UmlaziArea.asString(sectionName);

    section ??= MutArea.asString(sectionName);
    section ??= DutArea.asString(sectionName);
    section ??= HowardArea.asString(sectionName);
    section ??= MayvilleArea.asString(sectionName);
    section ??= SydenhamArea.asString(sectionName);
    section ??= DurbanCentralArea.asString(sectionName);
    section ??= NandaArea.asString(sectionName);

    section ??= 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa';

    return section;
  }

  static bool isInstitution(SectionName sectionName) {
    String sectionNameAsString = Converter.asString(sectionName);
    String firstPortion =
        sectionNameAsString.substring(0, sectionNameAsString.indexOf('-'));
    return firstPortion.contains('DUT') ||
        firstPortion.contains('Howard College (UKZN)') ||
        firstPortion.contains('Mangosuthu (MUT)');
  }

  // Default Mayville
  static int townOrInstitutionAsNumber(TownOrInstitution townOrInstitution) {
    switch (townOrInstitution) {
      case TownOrInstitution.umlazi:
        return 1;
      case TownOrInstitution.mut:
        return 2;
      case TownOrInstitution.dut:
        return 3;
      case TownOrInstitution.howardUKZN:
        return 4;
      case TownOrInstitution.sydenham:
        return 6;
      case TownOrInstitution.durbanCentral:
        return 7;
      case TownOrInstitution.nanda:
        return 8;
      default:
        return 5;
    }
  }

  // Default Mayville
  static String townOrInstitutionAsString(TownOrInstitution townOrInstitution) {
    switch (townOrInstitution) {
      case TownOrInstitution.umlazi:
        return 'Umlazi';
      case TownOrInstitution.mut:
        return 'Mangosuthu (MUT)';
      case TownOrInstitution.dut:
        return 'DUT';
      case TownOrInstitution.howardUKZN:
        return 'Howard College (UKZN)';
      case TownOrInstitution.sydenham:
        return 'Sydenham';
      case TownOrInstitution.durbanCentral:
        return 'Durban Central';
      case TownOrInstitution.nanda:
        return 'Nanda';
      default:
        return 'Mayville';
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
      case 'Howard College (UKZN)':
        return TownOrInstitution.howardUKZN;
      case 'Sydenham':
        return TownOrInstitution.sydenham;
      case 'Durban Central':
        return TownOrInstitution.durbanCentral;
      case 'Nanda':
        return TownOrInstitution.nanda;
      default:
        return TownOrInstitution.mayville;
    }
  }
}
