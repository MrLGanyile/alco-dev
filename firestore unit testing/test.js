import { readFileSync } from 'fs';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,

} from "@firebase/rules-unit-testing";



const PROJECT_ID = 'alco-15405';

const myUserData = {
  phoneNumber: '+27713498754',
  name: 'Lwandile',
  email: 'lwa@gmail.com',
  profileImageURL: '../../nkuxa.jpg',
};

const theirUserData = {
  phoneNumber: '+27778908754',
  name: 'Ntuthuko',
  email: 'gasa@gmail.com',
  profileImageURL: '../../ntuthuko.jpg',
};

const superiorAdminData = {
  phoneNumber: '+27834321212',
  profileImageURL: '../../image.jpg',
  isSuperior: true,
  isBlocked: false,
  key: 'efg',
  isFemale: true,
  townOrInstitution: 'Umlazi',
  joinedOn: {
    year: 2025,
    month: 9,
    day: 23
  }
};

const hostingAreaData = {
  hostingAreaId: 'abc',
  hostingAreaName: 'Nkuxa',
  sectionName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa',
  hostingAreaImageURL: '../../image1.jpg',
  pickUpArea: '...'

};

const normalAdminData = {
  phoneNumber: '+27854567812',
  profileImageURL: '../../image2.jpg',
  isSuperior: false,
  isBlocked: false,
  key: 'abc',
  isFemale: true,
  townOrInstitution: 'Mayville',
  joinedOn: {
    year: 2024,
    month: 9,
    day: 23
  }
};

const someId = '+27826355532';

describe('Our Alco App', () => {

  let testEnv = null;
  let myUser = null;
  let theirUser = null;
  let noUser = null;

  let superiorAdminUser = null;
  let normalAdminUser = null;

  beforeEach(async () => {

    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules: readFileSync("../firestore.rules", "utf8"),
        host: "127.0.0.1",
        port: "8080"
      },
    });

    // clear datastore
    await testEnv.clearFirestore();
    //await testEnv.cleanup();

    myUser = testEnv.authenticatedContext(myUserData.phoneNumber);
    theirUser = testEnv.authenticatedContext(theirUserData.phoneNumber);
    noUser = testEnv.unauthenticatedContext();

    superiorAdminUser = testEnv.authenticatedContext(superiorAdminData.phoneNumber);
    normalAdminUser = testEnv.authenticatedContext(normalAdminData.phoneNumber);


    // Initial alcoholics
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics').doc(myUserData.phoneNumber).set(myUserData);
    });
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics').doc(theirUserData.phoneNumber).set(theirUserData);
    });

    // Initialize admins
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(superiorAdminData.phoneNumber).set(superiorAdminData);
    });
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(normalAdminData.phoneNumber).set(normalAdminData);
    });

    // Initialize hosting areas
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId).set(hostingAreaData);
    });

  });

  afterEach(async () => {

    //await testEnv.clearFirestore();
    await testEnv.cleanup();

  });


  //================================Admin [Start]===================================
  // Testing /admins/{adminPhoneNumber}
  it('Offline User : Do not allow not logged in users to register an admin.', async () => {

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(normalAdminData.phoneNumber).delete();
    });

    const admin = {
      isSuperior: false,
      phoneNumber: normalAdminData.phoneNumber,
    }

    const doc = noUser.firestore().collection('admins').doc(admin.phoneNumber);
    await assertFails(doc.set(admin));
  });

  // Testing /admins/{adminPhoneNumber}
  it('Online User : Do not allow logged in users to register an admin.', async () => {

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(normalAdminData.phoneNumber).delete();
    });

    const admin = {
      isSuperior: false,
      phoneNumber: normalAdminData.phoneNumber,
    }


    const doc = myUser.firestore().collection('admins').doc(admin.phoneNumber);
    await assertFails(doc.set(admin));
  });

  // Testing /admins/{adminPhoneNumber}
  it('Normal Admin : Do not allow normal admins to register an admin.', async () => {

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(normalAdminData.phoneNumber).delete();
    });

    const admin = {
      isSuperior: false,
      phoneNumber: normalAdminData.phoneNumber,
    }


    const doc = normalAdminUser.firestore().collection('admins').doc(admin.phoneNumber);
    await assertFails(doc.set(admin));
  });

  // Testing /admins/{adminPhoneNumber}
  it('Superior Admin : Do not allow superior admins to register a superior admin.', async () => {

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(superiorAdminData.phoneNumber).delete();
    });

    const admin = {
      isSuperior: true,
      phoneNumber: superiorAdminData.phoneNumber,
    }


    const doc = superiorAdminUser.firestore().collection('admins').doc(admin.phoneNumber);
    await assertFails(doc.set(admin));
  });

  // Testing /admins/{adminPhoneNumber}
  it('Superior Admin : Allow superior admins to register an admin.', async () => {

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('admins').doc(normalAdminData.phoneNumber).delete();
    });

    const admin = {
      isSuperior: false,
      phoneNumber: normalAdminData.phoneNumber,
    }


    const doc = superiorAdminUser.firestore().collection('admins').doc(admin.phoneNumber);
    await assertSucceeds(doc.set(admin));
  });



  // Testing /admins/{adminPhoneNumber}
  it('Offline User : Do not allow not logged in users to view admins.', async () => {

    const doc = noUser.firestore().collection('admins')
      .doc(someId);
    await assertFails(doc.get());
  });

  // Testing /admins/{adminPhoneNumber}
  it('Online User : Do not allow logged in users to view admins.', async () => {

    const doc = myUser.firestore().collection('admins')
      .doc(someId);
    await assertFails(doc.get());
  });

  // Testing /admins/{adminPhoneNumber}
  it('Normal Admin : Allow normal admins to view admins.', async () => {

    const doc = normalAdminUser.firestore().collection('admins')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // Testing /admins/{adminPhoneNumber}
  it('Superior Admin : Allow superior admins to view admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(someId);
    await assertSucceeds(doc.get());
  });



  // Testing /admins/{adminPhoneNumber} 
  it('Offline User : Do not allow not logged in users to update admins.', async () => {

    const doc = noUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ isBlocked: true }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Online User : Do not allow logged in users to update admins.', async () => {

    const doc = myUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ isBlocked: true }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update admins.', async () => {

    const doc = normalAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ isBlocked: true }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update the isSuperior property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ isSuperior: '...' }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update the profileImageURL property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ profileImageURL: '...' }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update the isFemale property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ isFemale: '...' }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update the key property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ key: '...' }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update the townOrInstitution property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.update({ townOrInstitution: '...' }));
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Allow superior admins to update the isBlocked property of admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertSucceeds(doc.update({ isBlocked: true }));
  });




  // Testing /admins/{adminPhoneNumber} 
  it('Offline User : Do not allow not logged in users to delete normal admins.', async () => {

    const doc = noUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.delete());
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Online User : Do not allow logged in users to delete normal admins.', async () => {

    const doc = myUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.delete());
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to delete normal admins.', async () => {

    const doc = normalAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertFails(doc.delete());
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to delete superior admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(superiorAdminData.phoneNumber);
    await assertFails(doc.delete());
  });

  // Testing /admins/{adminPhoneNumber} 
  it('Superior Admin : Allow superior admins to delete normal admins.', async () => {

    const doc = superiorAdminUser.firestore().collection('admins')
      .doc(normalAdminData.phoneNumber);
    await assertSucceeds(doc.delete());
  });

  //================admin_crud ->  admin_crud_firestore_unit_testing================
  //================================Admin [End]===================================


  //================================Alcoholic [Start]===================================
  //==============alcoholic_crud ->  alcoholic_crud_firestore_unit_testing==============

  // Testing /alcoholics/{alcoholicId} 
  it('Offline User : Do not allow not logged in users to become alcoholics.', async () => {

    const alcoholic = {
      phoneNumber: '+27635453456',
      profileImageURL: '../image.png',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = noUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to become alcoholics if they provide incomplete info[1].', async () => {

    // Start by deleting myUser from the alcoholics collection.
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics')
        .doc(myUserData.phoneNumber).delete();
    });

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: null,
    };

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to become alcoholics if they provide incomplete info[2].', async () => {

    // Start by deleting myUser from the alcoholics collection.
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics')
        .doc(myUserData.phoneNumber).delete();
    });

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: "",
    };

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to become alcoholics if they provide incomplete info[3].', async () => {

    // Start by deleting myUser from the alcoholics collection.
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics')
        .doc(myUserData.phoneNumber).delete();
    });

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: null,
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to become alcoholics if they provide incomplete info[4].', async () => {

    // Start by deleting myUser from the alcoholics collection.
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics')
        .doc(myUserData.phoneNumber).delete();
    });

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: '',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to become alcoholics if they already have.', async () => {

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics').doc(alcoholic.phoneNumber).set(alcoholic);
    });

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set({ alcoholic, merge: true }));
  });

  it('Online User : Allow logged in users to become alcoholics if they provide complete info.', async () => {

    // Start by deleting myUser from the alcoholics collection.
    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('alcoholics')
        .doc(myUserData.phoneNumber).delete();
    });

    const alcoholic = {
      phoneNumber: myUserData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = myUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertSucceeds(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Normal Admin : Do not allow normal admins to become alcoholics.', async () => {

    const alcoholic = {
      phoneNumber: normalAdminData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = normalAdminUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Superior Admin : Do not allow superior admins to become alcoholics.', async () => {

    const alcoholic = {
      phoneNumber: superiorAdminData.phoneNumber,
      profileImageURL: '../image.png',
      sectionName: 'Dunbar-Mayville-Durban-Kwa Zulu Natal-South Africa',
    };

    const doc = superiorAdminUser.firestore().collection('alcoholics')
      .doc(alcoholic.phoneNumber);
    await assertFails(doc.set(alcoholic));
  });



  // Testing /alcoholics/{alcoholicId} 
  it('Offline User : Allow not logged in users to view alcoholics.', async () => {

    const doc = noUser.firestore().collection('alcoholics')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Allow logged in users to view alcoholics.', async () => {

    const doc = myUser.firestore().collection('alcoholics')
      .doc(myUserData.userId);
    await assertSucceeds(doc.get());
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Normal Admin : Allow normal admins to view alcoholics.', async () => {

    const doc = normalAdminUser.firestore().collection('alcoholics')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Superior Admin : Allow superior admins to view alcoholics.', async () => {

    const doc = superiorAdminUser.firestore().collection('alcoholics')
      .doc(someId);
    await assertSucceeds(doc.get());
  });



  // Testing /alcoholics/{alcoholicId} 
  it('Offline User : Do not allow not logged in users to update alcoholics.', async () => {

    const doc = noUser.firestore().collection('alcoholics')
      .doc(theirUserData.phoneNumber);
    await assertFails(doc.update({ profileImageURL: 'new data' }));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to update alcoholics\'data.', async () => {

    const doc = myUser.firestore().collection('alcoholics')
      .doc(myUserData.phoneNumber);
    await assertFails(doc.update({ profileImageURL: 'new data' }));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Normal Admin : Do not allow normal admins to update any alcoholic account.', async () => {

    const doc = normalAdminUser.firestore().collection('alcoholics')
      .doc(myUserData.phoneNumber);
    await assertFails(doc.update({ profileImageURL: 'new data' }));
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Superior Admin : Do not allow superior admins to update any alcoholic account.', async () => {

    const doc = superiorAdminUser.firestore().collection('alcoholics')
      .doc(myUserData.phoneNumber);
    await assertFails(doc.update({ profileImageURL: 'new data' }));
  });



  // Testing /alcoholics/{alcoholicId} 
  it('Offline User : Do not allow not logged in users to delete an alcoholic account.', async () => {

    const doc = noUser.firestore().collection('alcoholics').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /alcoholics/{alcoholicId} 
  it('Online User : Do not allow logged in users to delete an alcoholic account.', async () => {

    const doc = myUser.firestore().collection('alcoholics').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /alcoholics/{alcoholicId}  
  it('Normal Admin : Do not allow normal admins to delete an alcoholic account.', async () => {

    const doc = normalAdminUser.firestore().collection('alcoholics').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /alcoholics/{alcoholicId}  
  it('Superior Admin : Do not allow superior admins to delete an alcoholic account.', async () => {

    const doc = superiorAdminUser.firestore().collection('alcoholics').doc(someId);
    await assertFails(doc.delete());
  });

  //================================Alcoholic [End]===================================



  //================================Group [Start]===================================
  //================group_crud ->  group_crud_firestore_unit_testing================

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[1].', async () => {

    const group = {
      groupName: null,
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[2].', async () => {

    const group = {
      groupName: 'ab',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[3].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: null,
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[4].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: '',
      groupSpecificArea: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[5].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Getto-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[6].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: null,

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[7].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: '',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[9].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: myUserData.phoneNumber,
      groupCreatorImageURL: '',
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[10].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: null,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[11].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../p.jpg',
      groupCreatorUsername: null,
      isActive: false, // A group is active if it has atleast 3 members.
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[12].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: '',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[13].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[14].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 6,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to create groups if they provide incomplete info[15].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber]
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Allow not logged in users to create groups if they provide correct info.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[1].', async () => {

    const group = {
      groupName: null,
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[2].', async () => {

    const group = {
      groupName: 'ab',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[3].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: null,
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow logged in users to create groups if they provide incomplete info[4].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: '',
      groupSpecificArea: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[5].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Getto-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[6].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: null,

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[7].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: '',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[9].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: myUserData.phoneNumber,
      groupCreatorImageURL: '',
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[10].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: null,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[11].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../p.jpg',
      groupCreatorUsername: null,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[12].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: '',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[13].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[14].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 6,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to create groups if they provide incomplete info[15].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber]
    };

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[1].', async () => {

    const group = {
      groupName: null,
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[2].', async () => {

    const group = {
      groupName: 'ab',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[3].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: null,
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[4].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: '',
      groupSpecificArea: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[5].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Getto-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[6].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: null,

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[7].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: '',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[9].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: myUserData.phoneNumber,
      groupCreatorImageURL: '',
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[10].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: null,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[11].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../p.jpg',
      groupCreatorUsername: null,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[12].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: '',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[13].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[14].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 6,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin User : Do not allow normal admins to create groups if they provide incomplete info[15].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber]
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[1].', async () => {

    const group = {
      groupName: null,
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[2].', async () => {

    const group = {
      groupName: 'ab',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[3].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: null,
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[4].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: '',
      groupSpecificArea: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../..profile.jpg',
      groupCreatorUsername: 'some name',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[5].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Getto-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[6].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: null,

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[7].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: '',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[9].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: myUserData.phoneNumber,
      groupCreatorImageURL: '',
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[10].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: null,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[11].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: '../p.jpg',
      groupCreatorUsername: null,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[12].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: '',
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[13].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[14].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 6,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin User : Do not allow superior admins to create groups if they provide incomplete info[15].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: true,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber]
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Allow not logged in users to create groups if they provide correct info.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Allow logged in users to create groups if they provide correct info.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = theirUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Allow normal admins to create groups if they provide correct info.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.set(group));
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin : Allow superior admins to create groups.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.set(group));
  });



  // /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Allow not logged in users to view groups.', async () => {

    const doc = noUser.firestore().collection('groups')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Online User : Allow logged in users to view groups.', async () => {

    const doc = myUser.firestore().collection('groups')
      .doc(myUserData.userId);
    await assertSucceeds(doc.get());
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Allow normal admins to view groups.', async () => {

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin : Allow superior admins to view groups.', async () => {

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(someId);
    await assertSucceeds(doc.get());
  });




  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to update groups.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = noUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ isActive: true }));
  });

  it('Online User : Do not allow logged in users to update groups.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = myUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ isActive: true }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [1].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupName: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [2].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupImageURL: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [3].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupTownOrInstitution: 'xyz' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [4].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupSpecificArea: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [5].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupCreatorPhoneNumber: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [6].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupCreatorUsername: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [7].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupCreatorImageURL: '...' }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [8].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ groupMembers: ['a', 'b'] }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Do not allow normal admins to update unacceptable group fields [9].', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertFails(doc.update({ maxNoOfMembers: 4 }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Normal Admin : Allow normal admins to update groups.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },

      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = normalAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.update({ isActive: true }));
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Superior Admin : Do not allow superior admins to update groups.', async () => {

    const group = {
      groupName: '24-7',
      groupImageURL: 'xxx',
      groupArea: {
        areaNo: '',
        townOrInstitutionFK: '',
        areaName: 'Cato Manor-Mayville-Durban-Kwa Zulu Natal-South Africa'
      },
      groupSpecificArea: 'xxx',

      groupCreatorPhoneNumber: theirUserData.phoneNumber,
      groupCreatorImageURL: theirUserData.profileImageURL,
      groupCreatorUsername: theirUserData.name,
      isActive: false,
      maxNoOfMembers: 5,
      groupTownOrInstitution: '...',
      groupMembers: [theirUserData.phoneNumber, 'a', 'b', 'c', 'd']
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('groups')
        .doc(group.groupCreatorPhoneNumber).set(group);
    });

    const doc = superiorAdminUser.firestore().collection('groups')
      .doc(group.groupCreatorPhoneNumber);
    await assertSucceeds(doc.update({ isActive: true }));
  });



  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Offline User : Do not allow not logged in users to delete groups.', async () => {

    const doc = noUser.firestore().collection('groups').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /groups/{groupCreatorPhoneNumber} 
  it('Online User : Do not allow logged in users to delete groups.', async () => {

    const doc = myUser.firestore().collection('groups').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /groups/{groupCreatorPhoneNumber}  
  it('Normal Admin : Do not allow normal admins to delete groups.', async () => {

    const doc = normalAdminUser.firestore().collection('groups').doc(someId);
    await assertFails(doc.delete());
  });

  // Testing /groups/{groupCreatorPhoneNumber}  
  it('Superior Admin : Do not allow superior admins to delete groups.', async () => {

    const doc = superiorAdminUser.firestore().collection('groups').doc(someId);
    await assertFails(doc.delete());
  });
  //================group_crud ->  group_crud_firestore_unit_testing================
  //================================Group [End]===================================



  //===================================Hosting Area [Start]==========================================

  // Testing /hosting_areas/{hostingAreaId} 
  it('Offline User : Do not allow not logged in users to register a hosting area.', async () => {

    const doc = noUser.firestore().collection('hosting_areas').doc(someId);
    await assertFails(doc.set({ data: ' some data' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Online User : Do not allow logged in users to register a hosting area.', async () => {

    const doc = myUser.firestore().collection('hosting_areas').doc(someId);
    await assertFails(doc.set({ data: '' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Normal Admin : Do not allow normal admins to create a hosting area.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas').doc(someId);
    await assertFails(doc.set({ data: '' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Superior Admin : Allow superior admins to create a hosting area.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas').doc(someId);
    await assertSucceeds(doc.set({ data: '' }));
  }); // Working As Expected.




  // Testing /hosting_areas/{hostingAreaId} 
  it('Offline User : Allow not logged in users to view hosting areas.', async () => {

    const doc = noUser.firestore().collection('hosting_areas').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.


  // Testing /hosting_areas/{hostingAreaId} 
  it('Online User : Allow logged in users to view hosting areas.', async () => {

    const doc = myUser.firestore().collection('hosting_areas').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Normal Admin : Allow normal admins to view hosting areas.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Superior Admin : Allow superior admins to view hosting areas.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.




  // Testing /hosting_areas/{hostingAreaId} 
  it('Offline User : Do not allow not logged in users to update any hosting area.', async () => {

    // The store is already created during initialization.
    const doc = noUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.update({ hostingAreaName: 'new data' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Online User : Do not allow logged in users to update a hosting area.', async () => {

    // The store is already created during initialization.
    const doc = myUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.update({ hostingAreaName: 'new data' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Normal Admin : Do not allow normal admins to update a hosting area.', async () => {

    // The store is already created during initialization.
    const doc = normalAdminUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.update({ hostingAreaName: 'new data' }));
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId} 
  it('Superior Admin : Allow superior admins to update a hosting area.', async () => {

    // The store is already created during initialization.
    const doc = superiorAdminUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertSucceeds(doc.update({ hostingAreaName: 'new data' }));
  }); // Working As Expected.




  // Testing /hosting_areas/{hostingAreaId} 
  it('Offline User : Do not allow not logged in users to delete a hosting area.', async () => {

    const doc = noUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId}
  it('Online User : Do not allow logged in users to delete a hosting area.', async () => {

    const doc = myUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId}
  it('Normal Admin : Do not allow normal admins to delete a hosting area.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/{hostingAreaId}
  it('Superior Admin : Allow superior admins to delete a hosting area.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas').doc(hostingAreaData.hostingAreaId);
    await assertSucceeds(doc.delete());
  }); // Working As Expected.
  //===================================Hosting Area [End]==========================================


  //=====================Hosted Draw [Start]============================
  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId} 
  it('Offline User : Do not allow not logged in users to create a hosted draw.', async () => {

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws')
      .doc(someId);
    await assertFails(doc.set({ data: '' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId} 
  it('Online User : Do not allow logged in users to create a hosted draw.', async () => {

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws')
      .doc(someId);
    await assertFails(doc.set({ data: '' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Normal Admin : Do not allow normal admins to create a hosted draw.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws')
      .doc(someId);
    await assertFails(doc.set({ data: '' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Superior Admin : Allow super admins to create a hosted draw.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws')
      .doc(someId);
    await assertSucceeds(doc.set({ data: '' }));
  }); // Working As Expected.




  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Offline User : Allow not logged in users to view any hosted draw.', async () => {

    const doc = noUser.firestore().collection('hosting_areas').doc(someId)
      .collection('hosted_draws').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Online User : Allow logged in users to view any hosted draw.', async () => {

    const doc = myUser.firestore().collection('hosting_areas').doc(someId)
      .collection('hosted_draws').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}    
  it('Normal Admin : Allow normal admins to view any hosted draw.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas').doc(someId)
      .collection('hosted_draws').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}    
  it('Superior Admin : Allow superior admins to view any hosted draw.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas').doc(someId)
      .collection('hosted_draws').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.



  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Offline User : Do not allow not logged in users to update a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.update({ sectionName: 'new data' }));
  }); // Working As Expected.

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Online User : Do not allow logged in users to update a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.update({ sectionName: 'new data' }));
  }); // Working As Expected.

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Normal Admin : Do not allow normal admins to update a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.update({ sectionName: 'new data' }));
  });

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Superior Admin : Allow superior admins to update a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.update({ sectionName: 'new data' }));
  }); // Working As Expected.




  // Testing /hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Offline User : Do not allow not logged in users to delete a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Online User : Do not allow logged in users to delete a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Normal Admin : Do not allow normal admin to delete a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.delete());
  });

  // Testing/hosting_areas/hostId/hosted_draws/{hostedDrawId}  
  it('Superior Admin : Allow superior admin to delete a hosted draw.', async () => {

    const hostedDraw = {
      hostedDrawId: 'draw_bxb',
      hostingAreaFK: hostingAreaData.hostingAreaId,
      sectionName: 'ABC',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
        .doc(hostedDraw.hostedDrawId).set(hostedDraw);
    });

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostedDraw.hostingAreaFK).collection('hosted_draws')
      .doc(hostedDraw.hostedDrawId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  //=====================Hosted Draw [End]============================

  //=====================Hosted Draw Grand Price [Start]============================

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Offline User : Do not allow not logged in users to create hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '../../pic.jpg',
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Online User : Do not allow logged in users to create hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '../../pic.jpg',
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Normal Admin : Do not allow normal admins to create hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '../../pic.jpg',
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[1].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: null,
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[2].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '',
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[3].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '...',
      description: null,
      grandPriceIndex: 1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[4].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: '...',
      description: '',
      grandPriceIndex: 1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[5].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: null,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to create hosted draw grand prices with missing/incorrect info[6].', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: -1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertFails(doc.set(price));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Allow superior admins to create hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'XXX',
      description: 'some text',
      grandPriceIndex: 1,
    }

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);

    await assertSucceeds(doc.set(price));
  }); // Working As Expected.




  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Offline User : Allow not logged in users to view any hosted draw grand prices.', async () => {

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws').doc(someId)
      .collection('draw_grand_prices').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Online User : Allow logged in users to view any hosted draw grand prices.', async () => {

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws').doc(someId)
      .collection('draw_grand_prices').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}  
  it('Normal Admin : Allow normal admins to view any hosted draw grand prices.', async () => {

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws').doc(someId)
      .collection('draw_grand_prices').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}  
  it('Superior Admin : Allow superior admins to view any hosted draw grand prices.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(someId).collection('hosted_draws').doc(someId)
      .collection('draw_grand_prices').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.




  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Offline User : Do not allow not logged in users to update hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.update({ description: 'new description' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Online User : Do not allow logged in users to update hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.update({ description: 'new description' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Normal Admin : Do not allow normal admins to update hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.update({ description: 'new description' }));
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to update hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.update({ description: 'new description' }));
  }); // Working As Expected.




  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Offline User : Do not allow not logged in users to delete hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = noUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Online User : Do not allow logged in users to delete hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = myUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Normal Admin : Do not allow normal admins to delete hosted draw grand prices.', async () => {


    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = normalAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosting_areas/hostId/hosted_draws/hostedDrawId/draw_grand_prices/{grandPriceId}
  it('Superior Admin : Do not allow superior admins to delete hosted draw grand prices.', async () => {

    const price = {
      grandPriceId: 'abc',
      hostedDrawFK: 'xyz',
      imageURL: 'xxx',
      description: 'some text',
      grandPriceIndex: 0,
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosting_areas')
        .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
        .doc(price.hostedDrawFK).collection('draw_grand_prices')
        .doc(price.grandPriceId).set(price);
    });

    const doc = superiorAdminUser.firestore().collection('hosting_areas')
      .doc(hostingAreaData.hostingAreaId).collection('hosted_draws')
      .doc(price.hostedDrawFK).collection('draw_grand_prices')
      .doc(price.grandPriceId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  //=====================Hosted Draw Grand Price [End]============================



  //===============================Host Info [Start]======================================

  // Testing /hosts_info/{hostInfoId} 
  it('Offline User : Do not allow not logged in users to create host info.', async () => {

    const doc = noUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.set({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Online User : Do not allow logged in users to create host info.', async () => {

    const doc = myUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.set({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Normal Admin : Do not allow normal admins to create host info.', async () => {

    const doc = normalAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.set({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Superior Admin : Do not allow superior admins to create host info.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.set({ data: 'new data' }));
  }); // Working As Expected.



  // Testing /hosts_info/{hostInfoId} 
  it('Offline User : Allow not logged in users to view host info.', async () => {

    const doc = noUser.firestore().collection('hosts_info').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Online User : Allow logged in users to view host info.', async () => {

    const doc = myUser.firestore().collection('hosts_info').doc(myUserData.userId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Normal Admin : Allow normal admins to view host info.', async () => {

    const doc = normalAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Superior Admin : Allow superior admins to view host info.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.




  // Testing /hosts_info/{hostInfoId} 
  it('Offline User : Do not allow not logged in users to update a host info.', async () => {

    const hostInfo = {
      data: 'old data',
      hostInfoId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosts_info')
        .doc(hostInfo.hostInfoId).set(hostInfo);
    });

    const doc = noUser.firestore().collection('hosts_info').doc(hostInfo.hostInfoId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Online User : Do not allow logged in users to update a host info.', async () => {

    const hostInfo = {
      data: 'old data',
      hostInfoId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosts_info')
        .doc(hostInfo.hostInfoId).set(hostInfo);
    });

    const doc = myUser.firestore().collection('hosts_info').doc(hostInfo.hostInfoId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Normal Admin : Do not allow normal admins to update a host info.', async () => {

    const hostInfo = {
      data: 'old data',
      hostInfoId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosts_info')
        .doc(hostInfo.hostInfoId).set(hostInfo);
    });

    const doc = normalAdminUser.firestore().collection('hosts_info').doc(hostInfo.hostInfoId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Superior Admin : Do not allow superior admins to update a host info.', async () => {

    const hostInfo = {
      data: 'old data',
      hostInfoId: 'abc',
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('hosts_info')
        .doc(hostInfo.hostInfoId).set(hostInfo);
    });

    const doc = superiorAdminUser.firestore().collection('hosts_info').doc(hostInfo.hostInfoId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.


  // Testing /hosts_info/{hostInfoId} 
  it('Offline User : Do not allow not logged in users to delete host info.', async () => {

    const doc = noUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Online User : Do not allow logged in users to delete host info.', async () => {

    const doc = myUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Normal Admin : Do not allow normal admins to delete host info.', async () => {

    const doc = normalAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /hosts_info/{hostInfoId} 
  it('Superior Admin : Do not allow superior admins to delete host info.', async () => {

    const doc = superiorAdminUser.firestore().collection('hosts_info').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  //=============================== Host Info[End]======================================



  //=====================Won Price Summary [Start]============================

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Offline User : Allow not logged in users to view any won price summary.', async () => {

    const doc = noUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Online User : Allow logged in users to view any won price summary.', async () => {

    const doc = myUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Normal Admin : Allow normal admins to view any won price summary.', async () => {

    const doc = normalAdminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Superior Admin : Allow superior admins to view any won price summary.', async () => {

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.





  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Offline User : Do not allow not logged in users to update a won price summary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'info',
      data: 'old data',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = noUser.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Online User : Do not allow logged in users to update a won price summary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'info',
      data: 'old data',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Normal Admin : Do not allow normal admins to update a won price summary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'info',
      data: 'old data',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Superior Admin : Do not allow superior admins to update a won price summary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'info',
      data: 'old data',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(wonPriceSummary.wonPriceSummaryId);
    await assertFails(doc.update({ data: 'new data' }));
  }); // Working As Expected.



  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Offline User : Do not allow not logged in users to delete a won price summary.', async () => {

    const doc = noUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId} 
  it('Online User : Do not allow logged in users to delete a won price summary.', async () => {

    const doc = myUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Normal Admin : Do not allow normal admins to delete a won price summary.', async () => {

    const doc = normalAdminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /won_prices_summaries/{wonPriceSummaryId}  
  it('Superior Admin : Do not allow superior admins to delete a won price summary.', async () => {

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries').doc(someId);
    await assertFails(doc.delete());
  }); // Working As Expected.
  //=====================Won Price Summary [End]============================


  // ================Won Price Summary Comment [Start]================
  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Offline User : Do not allow not logged in users to create won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });


    const doc = noUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.set(comment));
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Do not allow logged in users to create a won price summary comment whose wonPriceSummaryFK does not match the corresponding wonPriceSummary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: someId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.set(comment));
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Do not allow logged in users to create a won price summary comment whose wonPriceSummaryId does not match the document id.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };


    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc('kkk');
    await assertFails(doc.set(comment));
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Do not allow logged in users to create a won price summary comment for a won price summary that does not exist.', async () => {


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: '123',
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.set(comment));
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Do not allow logged in users to create a won price summary comment whose forTownOrInstitution do not match the corresponding won price summary.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Umlazi',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.set(comment));
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Allow logged in users to create won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.set(comment));
  });

  it('Normal Admin : Allow normal admins to create won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.set(comment));
  });

  it('Superior Admin : Allow normal admins to create won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.set(comment));
  });


  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Offline User : Allow not logged in users to view won price summary comments.', async () => {

    const doc = noUser.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Online User : Allow logged in users to view a won price summary comment.', async () => {

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Normal Admin : Allow normal admins to view won price summary comments.', async () => {

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments')
      .doc(someId);
    await assertSucceeds(doc.get());
  });

  // /won_prices_summaries/{wonPriceSummaryId}/comments/{commentId} 
  it('Superior Admin : Allow superior admins to view a won price summary comment.', async () => {

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(someId).collection('comments')
      .doc(someId);
    await assertSucceeds(doc.get());
  });


  it('Offline User : Do not allow not logged in users to update won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = noUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Online User : Do not allow logged in users to update won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Online User : Allow logged in users to update won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Normal Admin : Do not allow normal admins to update won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Normal Admin : Allow normal admins to update won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: normalAdminData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Superior Admin : Do not allow superior admins to update won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.update({ forTownOrInstitution: 'DUT' }));
  });

  it('Superior Admin : Allow superior admins to update won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: superiorAdminData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.update({ forTownOrInstitution: 'DUT' }));
  });



  it('Offline User : Do not allow not logged in users to delete won price summary comments.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = noUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.delete());
  });

  it('Online User : Do not allow logged in users to delete won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.delete());
  });

  it('Online User : Allow logged in users to delete won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = myUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.delete());
  });

  it('Normal Admin : Do not allow normal admins to delete won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: myUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.delete());
  });

  it('Normal Admin : Allow normal admins to delete won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: normalAdminData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = normalAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.delete());
  });

  it('Superior Admin : Do not allow superior admins to delete won price summary comments they did not create.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: theirUserData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertFails(doc.delete());
  });

  it('Superior Admin : Allow superior admins to delete won price summary comments they created.', async () => {

    const wonPriceSummary = {
      wonPriceSummaryId: 'A23B',
      groupTownOrInstitution: 'Mayville',
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(wonPriceSummary.wonPriceSummaryId).set(wonPriceSummary);
    });


    const comment = {
      wonPriceCommentId: 'some id',
      creatorPhoneNumber: superiorAdminData.phoneNumber,
      forTownOrInstitution: 'Mayville',
      wonPriceSummaryFK: wonPriceSummary.wonPriceSummaryId,
      message: 'some name',
      imageURL: '../..profile.jpg',
      username: '...',
      dateCreated: {
        year: 2022,
        month: 11,
        day: 16,
        hour: 22,
        minute: 10,
      }
    };

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('won_prices_summaries')
        .doc(comment.wonPriceSummaryFK).collection('comments')
        .doc(comment.wonPriceCommentId).set(comment);
    });

    const doc = superiorAdminUser.firestore().collection('won_prices_summaries')
      .doc(comment.wonPriceSummaryFK).collection('comments')
      .doc(comment.wonPriceCommentId);
    await assertSucceeds(doc.delete());
  });
  // ================Won Price Summary Comment [End]================


  //=====================Past Post [Start]============================

  // Testing /past_posts/{postId} 
  it('Offline User : Do not allow not logged in users to create a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = noUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Do not allow logged in users to create a past post for an area they do not belong to.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 4,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = myUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Allow logged in users to create a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = myUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertSucceeds(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Normal Admin : Allow normal admins to create a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = normalAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertSucceeds(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Normal Admin : Do not allow normal admins to create a past post for an area they do not belong to.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 4,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = normalAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Superior Admin : Allow superior admins to update a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = superiorAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertSucceeds(doc.set(post));
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Superior Admin : Do not allow superior admins to create a past post for an area they do not belong to.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 4,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    const doc = superiorAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.set(post));
  }); // Working As Expected.



  // Testing /past_posts/{postId} 
  it('Offline User : Allow not logged in users to view any past post.', async () => {

    const doc = noUser.firestore().collection('past_posts').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Allow logged in users to view any past post.', async () => {

    const doc = myUser.firestore().collection('past_posts').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Normal Admin : Allow normal admins to view any past post.', async () => {

    const doc = normalAdminUser.firestore().collection('past_posts').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Superior Admin : Allow superior admins to view any past post.', async () => {

    const doc = superiorAdminUser.firestore().collection('past_posts').doc(someId);
    await assertSucceeds(doc.get());
  }); // Working As Expected.





  // Testing /past_posts/{postId} 
  it('Offline User : Do not allow not logged in users to update a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = noUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.update({ forTownOrInstitutionNo: 4 }));
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Do not allow logged in users to update a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.update({ forTownOrInstitutionNo: 4 }));
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Normal Admin : Do not allow normal admins to update a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = normalAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.update({ forTownOrInstitutionNo: 4 }));
  }); // Working As Expected.

  // Testing /past_posts/{postId}  
  it('Superior Admin : Do not allow superior admins to update a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = superiorAdminUser.firestore().collection('past_posts')
      .doc(post.postId);

    await assertFails(doc.update({ forTownOrInstitutionNo: 4 }));
  }); // Working As Expected.



  // Testing /past_posts/{postId} 
  it('Offline User : Do not allow not logged in users to delete a past post.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: '12345',
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = noUser.firestore().collection('past_posts').doc(post.postId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Do not allow logged in users to delete a past post they did not create.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: theirUserData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('past_posts').doc(post.postId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Online User : Allow logged in users to delete a past post they created.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: myUserData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = myUser.firestore().collection('past_posts').doc(post.postId);
    await assertSucceeds(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Normal Admin : Do not allow normal admins to delete a past post they did not create.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: theirUserData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = normalAdminUser.firestore().collection('past_posts').doc(post.postId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Normal Admin : Allow normal admin to delete a past post they created.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: normalAdminData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = normalAdminUser.firestore().collection('past_posts').doc(post.postId);
    await assertSucceeds(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Superior Admin : Do not allow normal admins to delete a past post they did not create.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: theirUserData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = superiorAdminUser.firestore().collection('past_posts').doc(post.postId);
    await assertFails(doc.delete());
  }); // Working As Expected.

  // Testing /past_posts/{postId} 
  it('Superior Admin : Allow superior admin to delete a past post they created.', async () => {

    const post = {
      postId: 'AAA',
      forTownOrInstitutionNo: 5,
      postCreator: {
        phoneNumber: superiorAdminData.phoneNumber,
        area: {
          townOrInstitutionFK: 5,
        }
      }
    }

    await testEnv.withSecurityRulesDisabled(context => {
      return context.firestore().collection('past_posts')
        .doc(post.postId).set(post);
    });

    const doc = superiorAdminUser.firestore().collection('past_posts').doc(post.postId);
    await assertSucceeds(doc.delete());
  }); // Working As Expected.
  //=====================Past Post [End]============================

});
