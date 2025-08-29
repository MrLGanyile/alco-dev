/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class FakeAlcoholics {
    constructor() {
    }

    async createFakeUmlaziAlcoholics(online) {

    }

    async createFakeMUTAlcoholics(online) {

    }

    async createFakeDUTAlcoholics(online) {

        // DUT 1
        const dutUserNames = [
            // Alcoholics below are authenticated.
            online ? "RYKBUZWbMURz3ILfybnSGpIQKxG2" : "i9dEsWoNn9dcoYcfp0UWMJSC08VW",
            online ? "16ozm44uT7PbezHF7vhmtOeqa953" : "klNH8McSzqrdJ8hlEnRgXQkslpJF"
        ];
        let reference = getFirestore().collection("alcoholics").doc(dutUserNames[0]);
        let alcoholic = {
            userId: reference.id,
            profileImageURL: "dut/alcoholics/profile_images/+27712345678.jpg",
            phoneNumber: "+27712345678",
            area: {
                townOrInstitutionFK: "3",
                areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
                areaNo: "29",
            },
            username: "Mr Mhlanga",
            password: "mrm",
        };
        await reference.set(alcoholic);

        // DUT 2
        reference = getFirestore().collection("alcoholics").doc(dutUserNames[1]);
        alcoholic = {
            userId: reference.id,
            profileImageURL: "dut/alcoholics/profile_images/+27723456789.jpg",
            phoneNumber: "+27723456789",
            area: {
                townOrInstitutionFK: "3",
                areaName: "DUT-Durban-Kwa Zulu Natal-South Africa",
                areaNo: "29",
            },
            username: "Jiyane",
            password: "ytcc",
        };
        await reference.set(alcoholic);

    }

    async createFakeUKZNAlcoholics(online) {

        // UKZN
        const ukznUserNames = [
            // Alcoholics below are authenticated.
            online ? "tTYYb0n5qUavhmENSrP9SytKt1V2" : "sHs3EWiJjPINmkj50051ij2dyLkN"
        ];
        let reference = getFirestore().collection("alcoholics").doc(ukznUserNames[0]);
        let alcoholic = {
            userId: reference.id,
            profileImageURL: "ukzn/alcoholics/profile_images/+27623456789.jpg",
            phoneNumber: "+27623456789",
            area: {
                townOrInstitutionFK: "4",
                areaName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
                areaNo: "30",
            },
            username: "Mbeje",
            password: "kwl-guys",
        };
        await reference.set(alcoholic);
    }

    async createFakeMayvilleAlcoholics(online) {

        // Mayville
        const mayvilleUserNames = [
            // Alcoholics below are authenticated.
            online ? "D8CBB1DjVHZXpFCcDTYTjldIVDX2" : "Wc5RNHS67csxXBECaJ2esblYdQ9k"
        ];
        let reference = getFirestore().collection("alcoholics").doc(mayvilleUserNames[0]);
        let alcoholic = {
            userId: reference.id,
            profileImageURL: "mayville/alcoholics/profile_images/+27612345678.jpg",
            phoneNumber: "+27612345678",
            area: {
                townOrInstitutionFK: "5",
                areaName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South ",
                areaNo: "31",
            },
            username: "Sakhile",
            password: "12abc12",
        };
        await reference.set(alcoholic);
    }

    async createFakeSydenhamAlcoholics(online) {


    }

    async createFakeDurbanCentralAlcoholics(online) {

        // Durban Central
        const durbanCentralUserNames = [
            // Alcoholics below are authenticated.
            online ? "WurvL7g6IgXVHYuMbfq4UnueVNQ2" : "3L1BNU0ptl9tUOuT3FOFduz8bmXo"
        ];


        let reference = getFirestore().collection("alcoholics").doc(durbanCentralUserNames[0]);
        let alcoholic = {
            userId: reference.id,
            profileImageURL: "durban central/alcoholics/profile_images/+27645678901.jpg",
            phoneNumber: "+27645678901",
            area: {
                townOrInstitutionFK: "7",
                areaName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
                areaNo: "44",
            },
            username: "Thando",
            password: "cii0",
        };
        await reference.set(alcoholic);
    }

    async createFakeAlcoholics(online) {
        await this.createFakeUmlaziAlcoholics(online);
        await this.createFakeDUTAlcoholics(online);
        await this.createFakeUKZNAlcoholics(online);
        await this.createFakeMayvilleAlcoholics(online);
        await this.createFakeSydenhamAlcoholics(online);
        await this.createFakeSydenhamAlcoholics(online);
        await this.createFakeDurbanCentralAlcoholics(online);
    }
}

export default FakeAlcoholics