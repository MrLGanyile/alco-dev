/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class MayvilleFakeGroups {

    constructor() {

    }

    // Images exist on emulator [Real Areas & Fake Members]
    async catoCrestGroups() {

        const host = "mayville";
        const group1Members = ["+27601111111", "+27611111111", "+27621111111", "+27631111111", "+27641111111"];
        const group1CreatorPhoneNumber = "+27601111111";
        const group2Members = ["+27602222222", "+27612222222", "+27622222222", "+27632222222", "+27642222222"];
        const group2CreatorPhoneNumber = "+27602222222";
        const group3Members = ["+27603333333", "+27613333333", "+27623333333", "+27633333333", "+27643333333"];
        const group3CreatorPhoneNumber = "+27603333333";
        const group4Members = ["+27604444444", "+27614444444", "+27624444444", "+27634444444", "+27644444444"];
        const group4CreatorPhoneNumber = "+27604444444";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "31",
        };
        const specificArea1 = 'Emakhontena';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "31",
        };
        const specificArea2 = 'Stop Street';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "31",
        };
        const specificArea3 = 'Stop 8';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "31",
        };
        const specificArea4 = 'Ko 1 Room';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Ompetha";
        const group1CreatorUsername = "Sizwe";

        const groupName2 = "Izinja Madoda";
        const group2CreatorUsername = "Zama";

        const groupName3 = "Real Madrid";
        const group3CreatorUsername = "Bonga";

        const groupName4 = "Abangenacala ";
        const group4CreatorUsername = "Stha";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);
    }

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoGreenGroups() {

        const host = "mayville";
        const group1Members = ["+27648395837", "+27648395836", "+27648395835", "+27648395834", "+27648395833"];
        const group1CreatorPhoneNumber = "+27648395837";
        const group2Members = ["+27638395837", "+27638395836", "+27638395835", "+27638395834", "+27638395833"];
        const group2CreatorPhoneNumber = "+27638395837";
        const group3Members = ["+27628395837", "+27628395836", "+27628395835", "+27628395834", "+27628395833"];
        const group3CreatorPhoneNumber = "+27628395837";
        const group4Members = ["+27618395837", "+27618395836", "+27618395835", "+27618395834", "+27618395833"];
        const group4CreatorPhoneNumber = "+27618395837";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Tutu Mngadi Circle [Ko Green]';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = '_____[Ko Green]';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Umkumbaan Dr [Ko Green]';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Ntombela Crest [Ko Green]';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Tigers";
        const group1CreatorUsername = "Jabulani";

        const groupName2 = "Iziqali Zendlela";
        const group2CreatorUsername = "Sfiso";

        const groupName3 = "Ofelenkanini";
        const group3CreatorUsername = "Thembeka";

        const groupName4 = "The Ones";
        const group4CreatorUsername = "Lungelo";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);
    }

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoPeachGroups() {

        const host = "mayville";
        const group1Members = ["+27624738493", "+27624738494", "+27624738495", "+27624738496", "+27624738497"];
        const group1CreatorPhoneNumber = "+27624738493";
        const group2Members = ["+27634738493", "+27634738494", "+27634738495", "+27634738496", "+27634738497"];
        const group2CreatorPhoneNumber = "+27634738493";
        const group3Members = ["+27644738493", "+27644738494", "+27644738495", "+27644738496", "+27644738497"];
        const group3CreatorPhoneNumber = "+27644738493";
        const group4Members = ["+27654738493", "+27654738492", "+27618395831", "+27618395830", "+27618395839"];
        const group4CreatorPhoneNumber = "+27654738493";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Eringini Ko-Peach';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Russell Mngomezulu ST';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Bothi Dladla Way';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Emaflethini';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Lions";
        const group1CreatorUsername = "James";

        const groupName2 = "Otsotsi";
        const group2CreatorUsername = "Thula";

        const groupName3 = "Zebras";
        const group3CreatorUsername = "Lindo";

        const groupName4 = "Ezomjolo";
        const group4CreatorUsername = "Sane";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);
    }

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewKoYellowGroups() {

        const host = "mayville";
        const group1Members = ["+27724738493", "+27724738494", "+27724738495", "+27724738496", "+27724738497"];
        const group1CreatorPhoneNumber = "+27724738493";
        const group2Members = ["+27734738493", "+27734738494", "+27734738495", "+27734738496", "+27734738497"];
        const group2CreatorPhoneNumber = "+27734738493";
        const group3Members = ["+27744738493", "+27744738494", "+27744738495", "+27744738496", "+27744738497"];
        const group3CreatorPhoneNumber = "+27744738493";
        const group4Members = ["+27714738493", "+27714738492", "+27718395831", "+27718395830", "+27718395839"];
        const group4CreatorPhoneNumber = "+27714738493";
        const group5Members = ["+27764738493", "+27764738492", "+27764738491", "+27764738490", "+27764738499"];
        const group5CreatorPhoneNumber = "+27764738493";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Embalenhle Road';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Hot Corner Car Wash';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Izwelabasha St';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Embalenhle Road';

        const group5Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea5 = 'Izwelabasha St';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Lions";
        const group1CreatorUsername = "James";

        const groupName2 = "Otsotsi";
        const group2CreatorUsername = "Thula";

        const groupName3 = "Zebras";
        const group3CreatorUsername = "Lindo";

        const groupName4 = "Ezomjolo";
        const group4CreatorUsername = "Sane";

        const groupName5 = "Africans";
        const group5CreatorUsername = "James";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        const group5 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group5CreatorPhoneNumber}.jpg`,
            groupArea: group5Area,
            groupSpecificArea: specificArea5,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group5CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group5CreatorPhoneNumber}/profile_images/${group5CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group5CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group5Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group5);


    }

    // Images exist on emulator [Real Areas & Fake Members]
    async richviewEmathininiGroups() {

        const host = "mayville";
        const group1Members = ["+27834857938", "+27834857937", "+27834857936", "+27834857935", "+27834857934"];
        const group1CreatorPhoneNumber = "+27834857938";
        const group2Members = ["+27844857938", "+27844857939", "+27844857930", "+27844857931", "+27844857932"];
        const group2CreatorPhoneNumber = "+27844857938";
        const group3Members = ["+27824857938", "+27824857937", "+27824857936", "+27824857935", "+27824857934"];
        const group3CreatorPhoneNumber = "+27824857938";
        const group4Members = ["+27814857938", "+27814857937", "+27814857936", "+27814857935", "+27814857934"];
        const group4CreatorPhoneNumber = "+27814857938";
        const group5Members = ["+27864857938", "+27864857937", "+27864857936", "+27864857935", "+27864857934"];
        const group5CreatorPhoneNumber = "+27864857938";

        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea1 = 'Emathinini E-Ringini';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea2 = 'Emathinini Ka-K';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea3 = 'Emathinini E-Passage Lesibili';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea4 = 'Emathinini Ka-A';

        const group5Area = {
            townOrInstitutionFK: "5",
            areaName: "Richview-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "33",
        };
        const specificArea5 = 'Emathinini Empompini';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Ezimnyama";
        const group1CreatorUsername = "Khule";

        const groupName2 = "Ojikelele";
        const group2CreatorUsername = "Ayo";

        const groupName3 = "Izimaku";
        const group3CreatorUsername = "Sihle";

        const groupName4 = "Ezobumnandi";
        const group4CreatorUsername = "Mpilo";

        const groupName5 = "Fellows";
        const group5CreatorUsername = "Zamani";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        const group5 = {
            groupName: groupName5,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group5CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea5,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group5CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group5CreatorPhoneNumber}/profile_images/${group5CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group5CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group5Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);

        groupReference = getFirestore().collection("groups").doc(group5.groupCreatorPhoneNumber);
        await groupReference.set(group5);
    }

    async nsimbiniGroups() {

        const host = "mayville";
        const group1Members = ["+27867826632", "+27867826631", "+27867826630", "+27867826639", "+27867826638"];
        const group1CreatorPhoneNumber = "+27867826632";
        const group2Members = ["+27847826632", "+27847826631", "+27847826630", "+27847826639", "+27847826638"];
        const group2CreatorPhoneNumber = "+27847826632";
        const group3Members = ["+27837826632", "+27837826631", "+27837826630", "+27837826639", "+27837826638"];
        const group3CreatorPhoneNumber = "+27837826632";
        const group4Members = ["+27827826632", "+27827826631", "+27827826630", "+27827826639", "+27827826638"];
        const group4CreatorPhoneNumber = "+27827826632";
        const group5Members = ["+27877826632", "+27877826631", "+27877826630", "+27877826639", "+27877826638"];
        const group5CreatorPhoneNumber = "+27877826632";


        const group1Area = {
            townOrInstitutionFK: "5",
            areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "36",
        };
        const specificArea1 = 'Guduza';

        const group2Area = {
            townOrInstitutionFK: "5",
            areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "36",
        };
        const specificArea2 = 'Bhambayi';

        const group3Area = {
            townOrInstitutionFK: "5",
            areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "36",
        };
        const specificArea3 = 'Ka Vodacom';

        const group4Area = {
            townOrInstitutionFK: "5",
            areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "36",
        };
        const specificArea4 = 'Marikana';

        const group5Area = {
            townOrInstitutionFK: "5",
            areaName: "Nsimbini-Mayville-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "36",
        };
        const specificArea5 = 'Emzini Emisha';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mayville",
            townOrInstitutionNo: "5",
        };

        const groupName1 = "Ezomkhuleko";
        const group1CreatorUsername = "Syanda";

        const groupName2 = "Buffullos";
        const group2CreatorUsername = "Mja";

        const groupName3 = "Humans";
        const group3CreatorUsername = "Maduma";

        const groupName4 = "Abanolwazi";
        const group4CreatorUsername = "Delani";

        const groupName5 = "Olungile";
        const group5CreatorUsername = "Lungi";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group1CreatorPhoneNumber}.jpg`,
            groupArea: group1Area,
            groupSpecificArea: specificArea1,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group1CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group1CreatorPhoneNumber}/profile_images/${group1CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group1CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group1Members,
            activationRequest: null,
        };

        const group2 = {
            groupName: groupName2,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group2CreatorPhoneNumber}.jpg`,
            groupArea: group2Area,
            groupSpecificArea: specificArea2,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group2CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group2CreatorPhoneNumber}/profile_images/${group2CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group2CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group2Members,
            activationRequest: null,
        };

        const group3 = {
            groupName: groupName3,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group3CreatorPhoneNumber}.jpg`,
            groupArea: group3Area,
            groupSpecificArea: specificArea3,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group3CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group3CreatorPhoneNumber}/profile_images/${group3CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group3CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group3Members,
            activationRequest: null,
        };

        const group4 = {
            groupName: groupName4,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group4CreatorPhoneNumber}.jpg`,
            groupArea: group4Area,
            groupSpecificArea: specificArea4,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group4CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group4CreatorPhoneNumber}/profile_images/${group4CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group4CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group4Members,
            activationRequest: null,
        };

        const group5 = {
            groupName: groupName5,
            groupRegisteryAdminId: null,
            groupImageURL: `/${host}/groups_specific_locations/${group5CreatorPhoneNumber}.jpg`,
            groupArea: group5Area,
            groupSpecificArea: specificArea5,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group5CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group5CreatorPhoneNumber}/profile_images/${group5CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group5CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group5Members,
            activationRequest: null,
        };

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

        groupReference = getFirestore().collection("groups").doc(group3.groupCreatorPhoneNumber);
        await groupReference.set(group3);

        groupReference = getFirestore().collection("groups").doc(group4.groupCreatorPhoneNumber);
        await groupReference.set(group4);

        groupReference = getFirestore().collection("groups").doc(group5.groupCreatorPhoneNumber);
        await groupReference.set(group5);
    }

}

export default MayvilleFakeGroups