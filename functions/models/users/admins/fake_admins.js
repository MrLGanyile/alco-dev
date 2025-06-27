/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class FakeAdmins {
    constructor() {

    }

    async createFakeAdmin() {
        let adminReference;

        const year = 2025;
        let month = 2;
        let day = 5;

        let admin;

        adminReference = getFirestore().collection("admins").doc('+27611111111');

        // Superior Admin
        admin =
        {
            userId: adminReference.id,
            isSuperior: true,
            key: "000",
            isFemale: false,
            townOrInstitution: "Mayville",
            phoneNumber: "+27611111111",
            profileImageURL: "/admins/profile_images/+27611111111.png",
            password: "qwerty321",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        adminReference = getFirestore().collection("admins").doc('+27610101010');

        admin =
        {
            userId: adminReference.id,
            isSuperior: true,
            key: "001",
            isFemale: true,
            townOrInstitution: "DUT",
            phoneNumber: "+27610101010",
            profileImageURL: "/admins/profile_images/+27610101010.jpg",
            password: "101010",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27620202020');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "002",
            isFemale: true,
            townOrInstitution: "Mayville",
            phoneNumber: "+27620202020",
            profileImageURL: "/admins/profile_images/+27620202020.jpg",
            password: "202020",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27630303030');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "003",
            isFemale: true,
            townOrInstitution: "UKZN",
            phoneNumber: "+27630303030",
            profileImageURL: "/admins/profile_images/+27630303030.jpg",
            password: "303030",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27640404040');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "004",
            isFemale: true,
            townOrInstitution: "Sydenham",
            phoneNumber: "+27640404040",
            profileImageURL: "/admins/profile_images/+27640404040.jpg",
            password: "404040",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27640404040');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "005",
            isFemale: true,
            townOrInstitution: "Sydenham",
            phoneNumber: "+27640404040",
            profileImageURL: "/admins/profile_images/+27640404040.jpg",
            password: "404040",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27650505050');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "006",
            isFemale: true,
            townOrInstitution: "Sydenham",
            phoneNumber: "+27650505050",
            profileImageURL: "/admins/profile_images/+27650505050.jpg",
            password: "505050",
            isBlocked: true,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27660606060');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "007",
            isFemale: true,
            townOrInstitution: "Durban Central",
            phoneNumber: "+27660606060",
            profileImageURL: "/admins/profile_images/+27660606060.jpg",
            password: "606060",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27670707070');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "008",
            isFemale: true,
            townOrInstitution: "UKZN",
            phoneNumber: "+27670707070",
            profileImageURL: "/admins/profile_images/+27670707070.jpg",
            password: "707070",
            isBlocked: false,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc('+27680808080');

        admin =
        {
            userId: adminReference.id,
            isSuperior: false,
            key: "009",
            isFemale: true,
            townOrInstitution: "DUT",
            phoneNumber: "+27680808080",
            profileImageURL: "/admins/profile_images/+27680808080.jpg",
            password: "808080",
            isBlocked: true,
            joinedOn: {
                year: year,
                month: month,
                day: day,
            }
        };

        await adminReference.set(admin);

    }
}

export default FakeAdmins