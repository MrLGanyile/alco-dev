/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";
class HowardFakeGroups {

    constructor() {

    }

    // Images exist on emulator [Real Areas & Fake Members]
    async onCompusGroups() {

        const host = "ukzn";
        const group1Members = ["+27801111111", "+27811111111", "+27821111111", "+27831111111", "+27841111111"];
        const group1CreatorPhoneNumber = "+27801111111";
        const group2Members = ["+27802222222", "+27812222222", "+27822222222", "+27832222222", "+27842222222"];
        const group2CreatorPhoneNumber = "+27802222222";
        const group3Members = ["+27803333333", "+27813333333", "+27823333333", "+27833333333", "+27843333333"];
        const group3CreatorPhoneNumber = "+27803333333";
        const group4Members = ["+27804444444", "+27844444444", "+27824444444", "+27834444444", "+27844444444"];
        const group4CreatorPhoneNumber = "+27804444444";

        const group5Members = ["+27805555555", "+27815555555", "+27825555555", "+27835555555", "+27845555555"];
        const group5CreatorPhoneNumber = "+27805555555";
        const group6Members = ["+27806666666", "+27846666666", "+278246666666", "+27836666666", "+27846666666"];
        const group6CreatorPhoneNumber = "+27806666666";

        const group1Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea1 = 'John Bews';

        const group2Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea2 = 'Mabel Palmer Hall';

        const group3Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea3 = 'Puis Langa';

        const group4Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea4 = 'Townley Williams Hall';

        const group5Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea5 = 'Charles James Hall';

        const group6Area = {
            townOrInstitutionFK: "4",
            areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "30",
        };
        const specificArea6 = 'Ansell May Hall';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Howard College UKZN",
            townOrInstitutionNo: "4",
        };

        const groupName1 = "Angels";
        const group1CreatorUsername = "Monica";

        const groupName2 = "Night Riders";
        const group2CreatorUsername = "Cat";

        const groupName3 = "Engineers";
        const group3CreatorUsername = "Sam";

        const groupName4 = "Rangers";
        const group4CreatorUsername = "Jimmy";

        const groupName5 = "Nerds";
        const group5CreatorUsername = "Jacob";

        const groupName6 = "Zebras";
        const group6CreatorUsername = "Sanele";

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
        };

        const group5 = {
            groupName: groupName5,
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
        };

        const group6 = {
            groupName: groupName6,
            groupImageURL: `/${host}/groups_specific_locations/${group6CreatorPhoneNumber}.jpg`,
            groupArea: group6Area,
            groupSpecificArea: specificArea6,
            groupTownOrInstitution: groupTownOrInstitution,

            groupCreatorPhoneNumber: group6CreatorPhoneNumber,
            groupCreatorImageURL: `/${host}/group_members/${group6CreatorPhoneNumber}/profile_images/${group6CreatorPhoneNumber}.jpg`,
            groupCreatorUsername: group6CreatorUsername,
            isActive: true,
            maxNoOfMembers: 5, // 5

            groupMembers: group6Members,
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

        groupReference = getFirestore().collection("groups").doc(group6.groupCreatorPhoneNumber);
        await groupReference.set(group6);

    }

}

export default HowardFakeGroups