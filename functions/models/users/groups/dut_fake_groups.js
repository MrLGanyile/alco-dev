/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class DUTFakeGroups {
    constructor() {

    }

    // Images exist on emulator [Real Areas & Fake Members]
    async dutBereaGroups() {
        const host = "dut";
        const group1Members = ["+27701111111", "+27711111111", "+27721111111", "+27731111111", "+27741111111"];
        const group1CreatorPhoneNumber = "+27701111111";
        const group2Members = ["+27702222222", "+27712222222", "+27722222222", "+27732222222", "+27742222222"];
        const group2CreatorPhoneNumber = "+27702222222";
        const group3Members = ["+27703333333", "+27713333333", "+27723333333", "+27733333333", "+27743333333"];
        const group3CreatorPhoneNumber = "+27703333333";
        const group4Members = ["+27704444444", "+27744444444", "+27724444444", "+27734444444", "+27744444444"];
        const group4CreatorPhoneNumber = "+27704444444";
        const group1Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea1 = 'Persara';

        const group2Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea2 = 'Regency';

        const group3Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea3 = 'Ayer Rock Gargens';

        const group4Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea4 = 'Hyper Velocity';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "DUT",
            townOrInstitutionNo: "3",
        };

        const groupName1 = "Game Changers";
        const group1CreatorUsername = "Melo";

        const groupName2 = "Cool Dudes";
        const group2CreatorUsername = "Zonke";

        const groupName3 = "Abashayi Besinqa";
        const group3CreatorUsername = "Ayo";

        const groupName4 = "Durban Rulers";
        const group4CreatorUsername = "Thanda";

        const group1 = {
            groupName: groupName1,
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
    async dutSydenhamGroups() {
        const host = "dut";
        const group1Members = ["+27701111110", "+27711111110", "+27721111110", "+27731111110", "+27741111110"];
        const group1CreatorPhoneNumber = "+27701111110";
        const group2Members = ["+27702222220", "+27712222220", "+27722222220", "+27732222220", "+27742222220"];
        const group2CreatorPhoneNumber = "+27702222220";
        const group3Members = ["+27703333330", "+27713333330", "+27723333330", "+27733333330", "+27743333330"];
        const group3CreatorPhoneNumber = "+27703333330";
        const group4Members = ["+27704444440", "+27714444440", "+27724444440", "+27734444440", "+27744444440"];
        const group4CreatorPhoneNumber = "+27704444440";
        const group1Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea1 = 'Icon';

        const group2Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea2 = 'Royal Shadows';

        const group3Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea3 = 'Disney Height';

        const group4Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea4 = 'Alcindor Trading';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "DUT",
            townOrInstitutionNo: "3",
        };

        const groupName1 = "Imigrants";
        const group1CreatorUsername = "Zethu";

        const groupName2 = "Italians";
        const group2CreatorUsername = "Thandanani";

        const groupName3 = "Africans";
        const group3CreatorUsername = "Buhle";

        const groupName4 = "Problem Solvers";
        const group4CreatorUsername = "Sbu";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
    async dutMixedGroups() {
        const host = "dut";
        const group1Members = ["+27837766452", "+27837766453", "+27837766454", "+27837766455", "+27837766456"];
        const group1CreatorPhoneNumber = "+27837766452";
        const group2Members = ["+27847766452", "+27847766453", "+27847766454", "+27847766455", "+27847766456"];
        const group2CreatorPhoneNumber = "+27847766452";
        const group3Members = ["+27867766452", "+27867766453", "+27867766454", "+27867766455", "+27867766456"];
        const group3CreatorPhoneNumber = "+27867766452";
        const group4Members = ["+27897766452", "+27897766453", "+27897766454", "+27897766455", "+27897766456"];
        const group4CreatorPhoneNumber = "+27897766452";
        const group5Members = ["+27817766452", "+27817766453", "+27817766454", "+27817766455", "+27817766456"];
        const group5CreatorPhoneNumber = "+27817766452";
        const group1Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea1 = 'Stratford';

        const group2Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea2 = 'Corlo Court';

        const group3Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea3 = 'Dunfor';

        const group4Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea4 = 'Sterling';

        const group5Area = {
            townOrInstitutionFK: "3",
            areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "29",
        };
        const specificArea5 = 'Steve Biko';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "DUT",
            townOrInstitutionNo: "3",
        };

        const groupName1 = "Africans";
        const group1CreatorUsername = "Thobeka";

        const groupName2 = "Asians";
        const group2CreatorUsername = "Sakhile";

        const groupName3 = "Gamers";
        const group3CreatorUsername = "Simo";

        const groupName4 = "Kings";
        const group4CreatorUsername = "Mikel";

        const groupName5 = "Zillionaires";
        const group5CreatorUsername = "Amahle";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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
            groupRegisteryAdminId: '4kVF6YK7Flc4nw31JQfDh0vZLFB2',
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

export default DUTFakeGroups