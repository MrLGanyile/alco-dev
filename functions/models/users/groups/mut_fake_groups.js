/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";
class MUTFakeGroups {

    constructor() {

    }

    async mutGroups() {

        const host = "mangosuthu (mut)";
        const group1Members = ["+27819726826", "+27819726827", "+27819726828", "+27819726829", "+27819726820"];
        const group1CreatorPhoneNumber = "+27819726826";

        const group2Members = ["+27819720000", "+27819720001", "+27819720002", "+27819720003", "+27819720004"];
        const group2CreatorPhoneNumber = "+27819720000";


        const group1Area = {
            townOrInstitutionFK: "2",
            areaName: "Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "28",
        };
        const specificArea1 = 'Floradene';

        const group2Area = {
            townOrInstitutionFK: "2",
            areaName: "Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "28",
        };
        const specificArea2 = 'The Glades On 131';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Mangosuthu (MUT)",
            townOrInstitutionNo: "2",
        };

        const groupName1 = "Top Dogs";
        const group1CreatorUsername = "Fellows";

        const groupName2 = "Haters";
        const group2CreatorUsername = "Bhunu";

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

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

    }

}

export default MUTFakeGroups