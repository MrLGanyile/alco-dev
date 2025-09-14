/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";
class UmlaziFakeGroups {

    constructor() {

    }

    async umlaziGroups() {

        const host = "umlazi";
        const group1Members = ["+27656565656", "+27646565656", "+27636565656", "+27626565656", "+27616565656"];
        const group1CreatorPhoneNumber = "+27656565656";

        const group2Members = ["+27757575757", "+27747575757", "+27737575757", "+27727575757", "+27717575757"];
        const group2CreatorPhoneNumber = "+27757575757";


        const group1Area = {
            townOrInstitutionFK: "1",
            areaName: "H Section-Umlazi-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "11",
        };
        const specificArea1 = 'Emarasteni';

        const group2Area = {
            townOrInstitutionFK: "1",
            areaName: "Z Section-Umlazi-Durban-Kwa Zulu Natal-South Africa",
            areaNo: "27",
        };
        const specificArea2 = 'Ebrijini';

        const groupTownOrInstitution = {
            cityFK: "1",
            townOrInstitutionName: "Umlazi",
            townOrInstitutionNo: "1",
        };

        const groupName1 = "Chinese";
        const group1CreatorUsername = "My Nigga";

        const groupName2 = "Asians";
        const group2CreatorUsername = "Nane";

        const group1 = {
            groupName: groupName1,
            groupRegisteryAdminId: 'wulep0IRp6frpI3CzqaxGUxTKBb2',
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

        let groupReference;
        groupReference = getFirestore().collection("groups").doc(group1.groupCreatorPhoneNumber);
        await groupReference.set(group1);

        groupReference = getFirestore().collection("groups").doc(group2.groupCreatorPhoneNumber);
        await groupReference.set(group2);

    }

}

export default UmlaziFakeGroups