import 'package:alco_dev/controllers/group_controller.dart';
import 'package:alco_dev/models/locations/supported_area.dart';
import 'package:alco_dev/models/locations/supported_town_or_institution.dart';
import 'package:alco_dev/models/users/group.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

class MockGroupController extends Mock implements GroupController {}

late Group myGroup;

late MockGroupController mockGroupController;

late GroupController groupController;

void main() {
  setUp(() {
    myGroup = Group(
        groupName: 'Izinkawu Zezwe',
        groupImageURL: '/mayville/groups_specific_locations/+27635849585.jpg',
        groupTownOrInstitution: SupportedTownOrInstitution(),
        groupArea: SupportedArea(),
        groupCreatorPhoneNumber: '+27635849585',
        groupCreatorImageURL:
            '/mayville/alcoholics/profile_images/+27635849585.jpg',
        groupCreatorUsername: 'Mazweni',
        groupMembers: [
          '+27635849585',
          '+27635849586',
          '+27635849587',
          '+27635849588',
          '+27635849589'
        ],
        maxNoOfMembers: 5);
  });

  setUpAll((() {
    mockGroupController = MockGroupController();
  }));

  group('Group Controller [Activation Request CRUD]', () {
    // Create
    group('saveActivationReqeust', () async {
      test(
          'Given An Empty Voucher, When Trying To Create An '
          'ActivationReqeust, Return Voucher Not Provided Status.',
          () async {});

      test(
          'Given An Invalid Voucher, When Trying To Create An '
          'ActivationReqeust, Return Invalid Voucher Status.',
          () async {});

      test(
          'Given A Voucher Without A Corresponding Group Id Set, '
          'When Trying To Create An ActivationReqeust, Return Group Not'
          ' Specified Status.',
          () async {});

      test(
          'Given A Voucher With The Corresponding Group Id Set, Create An '
          'ActivationReqeust And Return Pending Status.', () async {
        // Arrange
        when(() => mockGroupController.saveActivationRequest('1234567890'))
            .thenAnswer((invocation) =>
                Future.value(ActivationRequestSavingStatus.groupNotSpecified));

        // Action

        // Assert
      });
    });

    // Update
    group('approveOrDisapproveActivationReqeust', () {
      test(
          'Given A Group Id, When It Is Proven Not To Exist, '
          'Throw An Exception.',
          () async {});

      test(
          'Given A Group Id, When It Is Proven To Exist, '
          'Update The Corresponding Group And ActivationReqeust.',
          () async {});
    });
  });

  group('Group Controller [Group CRUD]', () {
    // Create
    group('createGroup', () {
      test(
          'Given A Group With Atleast One Member Missing, '
          'When createGroup Is Invoked, Return incompleteData '
          'Group Status.',
          () async {});

      test(
          'Given A Group With Five Members, '
          'When createGroup Is Invoked, Return saved '
          'Group Status.',
          () async {});
    });

    // Read
    test('readAllGroups', () async {});

    test('readGroupsWithActivationRequest', () async {});

    group('readGroups', () {
      test(
          'Given A TownOrInstitutionNo That Is Not Supported, When readGroups Is'
          ' Invoked, Throw An Exception.',
          () async {});

      test(
          'Given A TownOrInstitutionNo, When readGroups Is'
          ' Invoked, Return A List Of Corresponding Groups.',
          () async {});
    });

    group('readGroupsPhoneNumbers', () async {
      test(
          'Given A TownOrInstitutionNo That Is Not Supported, '
          'When readGroupsPhoneNumbers Is Invoked, Throw An Exception.',
          () async {});

      test(
          'Given A TownOrInstitutionNo, When readGroupsPhoneNumbers Is'
          ' Invoked, Return A List Of Corresponding Groups.',
          () async {});
    });

    test('readFutureAllGroups', () async {});

    // Update
    group('activateOrDeactivateAllGroups', () async {
      test(
          'Given Action As True, When activateOrDeactivateAllGroups Is Called,'
          'All Groups Afters Should Have IsApproved As True.',
          () async {});
      test(
          'Given Action As False, When activateOrDeactivateAllGroups Is Called,'
          'All Groups Afters Should Have IsApproved As False.',
          () async {});
    });
  });

  group('Group Controller [RecruitmentHistory CRUD]', () {
    group('saveRecruitmentHistory', () {
      test(
          'Given A Group Id For A Group That Exist, An Action To Perform, '
          'And No Logged In User, when saveRecruitmentHistory '
          'Is Invoked, Do Not Save RecruitmentHistory And Return '
          'A Log In Required Status.',
          () async {});

      test(
          'Given A Group Id For A Group That Exist, An Action To Perform, '
          'And A Logged In User Who Is Not An Admin, '
          'when saveRecruitmentHistory Is Invoked, Do '
          'Not Save RecruitmentHistory And Return '
          'An Unauthorized Status.',
          () async {});

      test(
          'Given A Group Id For A Group That Exist, An Action To Perform, '
          'And A Logged In Blocked Admin, when saveRecruitmentHistory '
          'Is Invoked, Do Not Save RecruitmentHistory And Return '
          'A Blocked Status.',
          () async {});

      test(
          'Given A Group Id For A Group That Do Not Exist, An Action To Perform, '
          'And A Logged In User Admin, when saveRecruitmentHistory '
          'Is Invoked, Do Not Save A RecruitmentHistory And Throw An Exception.',
          () async {});

      test(
          'Given A Group Id For A Group That Exist, An Action To Perform, '
          'And A Logged In User Admin, when saveRecruitmentHistory '
          'Is Invoked, Save RecruitmentHistory And Return A Saved Status.',
          () async {});
    });
  });

  test('clearAll', () async {});

  test('setSupportedArea', () async {});

  test('setMaxNoOfMembers', () async {});

  test('setIsActive', () async {});

  test('hasMember', () async {});

  test('countMembers', () async {});

  test('allValidPhoneNumbers', () async {});

  test('trimmedAllImageURLs', () async {});
}
