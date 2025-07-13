/* eslint-disable*/
import { getFirestore } from "firebase-admin/firestore";

class FakePosts {
    constructor() {

    }

    async createFakePosts() {

        let postId;
        let postCreator;

        let whereWereYouText = '';
        let whereWereYouImageURL = '';
        let whereWereYouVoiceRecordURL = '';
        let whereWereYouVideoURL = '';

        let whoWereYouWithText = '';
        let whoWereYouWithImageURL = '';
        let whoWereYouWithVoiceRecordURL = '';
        let whoWereYouWithVideoURL = '';

        let whatHappenedText = '';
        let whatHappenedVoiceRecordURL = '';
        let whatHappenedVideoURL = '';

        let reference;

        let post;

        // Mayville Posts
        postCreator = {
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

        reference = getFirestore().collection("past_posts").doc('YPhSlxPZJOw3VHaEhEnh');
        postId = reference.id;

        whereWereYouText = 'Ay Besenza Amasimba Izolo KaSbu E-Carwash...'

        post = {
            postId: postId,
            postCreator: postCreator,
            forTownOrInstitution: "Mayville",
            dateCreated: {
                year: 2025,
                month: 6,
                date: 21,
                hour: 16,
                minute: 5
            },
            whereWereYouText: whereWereYouText,
            whereWereYouImageURL: whereWereYouImageURL,
            whereWereYouVoiceRecordURL: whereWereYouVoiceRecordURL,
            whereWereYouVideoURL: whereWereYouVideoURL,

            whoWereYouWithText: whoWereYouWithText,
            whoWereYouWithImageURL: whoWereYouWithImageURL,
            whoWereYouWithVoiceRecordURL: whoWereYouWithVoiceRecordURL,
            whoWereYouWithVideoURL: whoWereYouWithVideoURL,

            whatHappenedText: whatHappenedText,
            whatHappenedVoiceRecordURL: whatHappenedVoiceRecordURL,
            whatHappenedVideoURL: whatHappenedVideoURL,
        }

        await reference.set(post);

        // UKZN
        postCreator = {
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

        reference = getFirestore().collection("past_posts").doc('vZELHiDLVATDtGNfpbpr');
        postId = reference.id;

        whereWereYouText = '';
        whoWereYouWithImageURL = `ukzn/past_posts/who_were_you_with/images/${postId}.jpeg`;

        post = {
            postId: postId,
            forTownOrInstitution: "Howard College UKZN",
            postCreator: postCreator,
            dateCreated: {
                year: 2025,
                month: 6,
                date: 21,
                hour: 15,
                minute: 5
            },
            whereWereYouText: whereWereYouText,
            whereWereYouImageURL: whereWereYouImageURL,
            whereWereYouVoiceRecordURL: whereWereYouVoiceRecordURL,
            whereWereYouVideoURL: whereWereYouVideoURL,

            whoWereYouWithText: whoWereYouWithText,
            whoWereYouWithImageURL: whoWereYouWithImageURL,
            whoWereYouWithVoiceRecordURL: whoWereYouWithVoiceRecordURL,
            whoWereYouWithVideoURL: whoWereYouWithVideoURL,

            whatHappenedText: whatHappenedText,
            whatHappenedVoiceRecordURL: whatHappenedVoiceRecordURL,
            whatHappenedVideoURL: whatHappenedVideoURL,
        }

        await reference.set(post);

        // Sydenham Posts
        postCreator = {
            profileImageURL: "sydenham/alcoholics/profile_images/+27634567890.jpg",
            phoneNumber: "+27634567890",
            area: {
                townOrInstitutionFK: "6",
                areaName: "Foreman-Sydenham-Durban-Kwa Zulu Natal-South Africa",
                areaNo: "37",
            },
            username: "Sizwe",
            password: "czwe21",
        };

        reference = getFirestore().collection("past_posts").doc('hvG8JtY3muSmjkp6mpE1');
        postId = reference.id;

        whoWereYouWithImageURL = '';
        whatHappenedVideoURL = `sydenham/past_posts/what_happened/videos/${postId}.mp4`;

        post = {
            postId: postId,
            forTownOrInstitution: "Sydenham",
            postCreator: postCreator,
            dateCreated: {
                year: 2025,
                month: 6,
                date: 19,
                hour: 16,
                minute: 5
            },
            whereWereYouText: whereWereYouText,
            whereWereYouImageURL: whereWereYouImageURL,
            whereWereYouVoiceRecordURL: whereWereYouVoiceRecordURL,
            whereWereYouVideoURL: whereWereYouVideoURL,

            whoWereYouWithText: whoWereYouWithText,
            whoWereYouWithImageURL: whoWereYouWithImageURL,
            whoWereYouWithVoiceRecordURL: whoWereYouWithVoiceRecordURL,
            whoWereYouWithVideoURL: whoWereYouWithVideoURL,

            whatHappenedText: whatHappenedText,
            whatHappenedVoiceRecordURL: whatHappenedVoiceRecordURL,
            whatHappenedVideoURL: whatHappenedVideoURL,
        }

        await reference.set(post);

        // Durban Central
        postCreator = {
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

        reference = getFirestore().collection("past_posts").doc('hfkDGamfn6h38sioety0');
        postId = reference.id;

        whatHappenedVideoURL = '';

        whereWereYouImageURL = `durban central/past_posts/where_were_you/images/${postId}.jpg`
        whoWereYouWithVideoURL = `durban central/past_posts/who_were_you_with/videos/${postId}.mp4`;
        whatHappenedText = `We Partied All Nights, The Funny This is, There Was A Guy Who Pissed Himself!!! How Groose...`;

        post = {
            postId: postId,
            forTownOrInstitution: "Durban Central",
            postCreator: postCreator,
            dateCreated: {
                year: 2025,
                month: 4,
                date: 1,
                hour: 4,
                minute: 5
            },
            whereWereYouText: whereWereYouText,
            whereWereYouImageURL: whereWereYouImageURL,
            whereWereYouVoiceRecordURL: whereWereYouVoiceRecordURL,
            whereWereYouVideoURL: whereWereYouVideoURL,

            whoWereYouWithText: whoWereYouWithText,
            whoWereYouWithImageURL: whoWereYouWithImageURL,
            whoWereYouWithVoiceRecordURL: whoWereYouWithVoiceRecordURL,
            whoWereYouWithVideoURL: whoWereYouWithVideoURL,

            whatHappenedText: whatHappenedText,
            whatHappenedVoiceRecordURL: whatHappenedVoiceRecordURL,
            whatHappenedVideoURL: whatHappenedVideoURL,
        }

        await reference.set(post);
    }
}

export default FakePosts