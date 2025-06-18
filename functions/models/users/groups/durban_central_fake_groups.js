/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class DurbanCentralFakeGroups {
    constructor() {

    }

    // Images exist on emulator [Real Areas & Fake Members]
    async durbanCentralGroups() {
        const host = "durban central";
        const group1Members = ["+27600000000", "+27600000001", "+27600000002", "+27600000003", "+27600000004"];
        const group1CreatorPhoneNumber = "+27600000000";
        const group2Members = ["+27610000000", "+27610000001", "+27610000002", "+27610000003", "+27610000004"];
        const group2CreatorPhoneNumber = "+27610000000";
        const group3Members = ["+27620000000", "+27620000001", "+27620000002", "+27620000003", "+27620000004"];
        const group3CreatorPhoneNumber = "+27620000000";
        const group4Members = ["+27630000000", "+27630000001", "+27630000002", "+27630000003", "+27630000004"];
        const group4CreatorPhoneNumber = "+27630000000";

        const group1Area = {
            townOrInstitutionFK: "7",
            areaName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "44",
        };
        const specificArea1 = 'Regency';

        const group2Area = {
            townOrInstitutionFK: "7",
            areaName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "44",
        };
        const specificArea2 = 'Cuban';

        const group3Area = {
            townOrInstitutionFK: "7",
            areaName: "Glenwood-Durban Central-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "43",
        };
        const specificArea3 = 'Lyndely';

        const group4Area = {
            townOrInstitutionFK: "7",
            areaName: "Masgrave-Durban Central-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "46",
        };
        const specificArea4 = 'Floredene';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Durban Central",
            townOrInstitutionNo: "7",
        };

        const groupName1 = "Ass Kickers";
        const group1CreatorUsername = "Roney";

        const groupName2 = "Nice Guys";
        const group2CreatorUsername = "Menzi";

        const groupName3 = "High Rollers";
        const group3CreatorUsername = "Sne";

        const groupName4 = "The Queens";
        const group4CreatorUsername = "Zinhle";


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
}

export default DurbanCentralFakeGroups