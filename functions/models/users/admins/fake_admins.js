/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class FakeAdmins {
    constructor() {

    }

    async createFakeAdmin(online) {
        let adminReference;

        const year = 2025;
        let month = 8;
        let day = 28;

        let admin;

        const adminsUserIds = [
            // Admins below are authenticated.
            "wulep0IRp6frpI3CzqaxGUxTKBb2", // +27611111111
            online ? "4kVF6YK7Flc4nw31JQfDh0vZLFB2" : "THWhJDUb72tnZSuqCXJqqDeILySl", // +27620202020
            online ? "jv4obW7Ei6WgD1qJS4rXOs0RXLt2" : "tEBJPHLlKqCoacmXds5rW4uKOBrM", // +27630303030
            online ? "uIMQUYudeNbgEnrW6Z9dTpLyjAG2" : "tTy9L9kpLAPFPDkrIIaaXXwmUVvf", // +27640404040
        ];

        adminReference = getFirestore().collection("admins").doc(adminsUserIds[0]);

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

        month = 1 + Math.floor(Math.random() * 11);
        day = 1 + Math.floor(Math.random() * 30);

        adminReference = getFirestore().collection("admins").doc(adminsUserIds[1]);

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

        adminReference = getFirestore().collection("admins").doc(adminsUserIds[2]);

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

        adminReference = getFirestore().collection("admins").doc(adminsUserIds[3]);

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

    }
}

export default FakeAdmins