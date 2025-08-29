/* eslint-disable*/
"use strict";

// [START all]
// [START import]
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
import { logger } from "firebase-functions";

import { onDocumentCreated, onDocumentUpdated }
    from "firebase-functions/v2/firestore";

import { onCall } from "firebase-functions/v2/https";

import { onRequest } from "firebase-functions/v2/https";

// The Firebase Admin SDK to access Firestore.
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

import { debug, log } from "firebase-functions/logger";

import { onSchedule } from "firebase-functions/v2/scheduler";

const liveCometitionsRuntimeOpts = {
    timeoutSeconds: 420,
    memory: "1GiB",
    minInstances: 5
};

const pickingMultipleInSeconds = 3;
const maxNumberOfGroupCompetitors = 200;
let currentUID = null;

// initializeApp();
// var serviceAccount = require("C:/Users/Lwandile-Ganyile/Documents/Lwandile Ganyile/Alco-Dev/alco_dev/alco-dev-credentials.json");

/*

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
}); */

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://alco-dev-15405.firebaseio.com'
});

/*
initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: 'https://alco-dev-15405.firebaseio.com'
}); */


import CountriesCreation from "./models/locations/countries-creation.js";
import ProvinciesOrStatesCreation from "./models/locations/provinces-or-states-creation.js";
import CitiesCreation from "./models/locations/cities-creation.js";
import TownsOrInstitutionsCreation from "./models/locations/towns-or-institutions-creation.js";
import AreasCreation from "./models/locations/areas-creation.js";


import UmlaziFakeGroups from "./models/users/groups/umlazi_fake_groups.js";
import MUTFakeGroups from "./models/users/groups/mut_fake_groups.js";
import DUTFakeGroups from "./models/users/groups/dut_fake_groups.js";
import HowardFakeGroups from "./models/users/groups/howard_fake_groups.js";
import MayvilleFakeGroups from "./models/users/groups/mayville_fake_groups.js";
import SydenhamFakeGroups from "./models/users/groups/sydenham_fake_groups.js";
import DurbanCentralFakeGroups from "./models/users/groups/durban_central_fake_groups.js";

import FakeAdmins from "./models/users/admins/fake_admins.js";
import FakeAlcoholics from "./models/users/alcoholics/fake_alcoholics.js";
import FakePosts from "./models/posts/fake_posts.js";

const umlaziFakeGroups = new UmlaziFakeGroups();
const mutFakeGroups = new MUTFakeGroups();
const dutFakeGroups = new DUTFakeGroups();
const howardFakeGroups = new HowardFakeGroups();
const mayvilleFakeGroups = new MayvilleFakeGroups();
const sydenhamFakeGroups = new SydenhamFakeGroups();
const durbanCentralFakeGroups = new DurbanCentralFakeGroups();

const fakeAdmins = new FakeAdmins();
const fakeAlcoholics = new FakeAlcoholics();
const fakePosts = new FakePosts();


// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createSupportedLocations/
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeAlcoholics
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveHostingAreas
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveFakeAdmins
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeGroups?hostIndex=2
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeDraws?hostIndex=2
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createCompetitions
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveFakePosts

// ###################Production Functions [Start]########################
/*
export const setCurrentUID = onCall(
    { region: "africa-south1" },
    async (request) => {
        const authToken = request.data.token;
        const userId = request.data.userId;



        try {
            const userAuth = await getAuth()
                .verifyIdToken(authToken);

            logger.log(`Token Was Verified Successfully.`);

            if (userId != userAuth.uid) {
                // res.sendStatus(403);
                logger.log(`User Wasn't Identified Successfully.`);
                return false;
            }
            else {
                currentUID = userId;
                // res.sendStatus(200);
                logger.log(`User Was Identified Successfully. Token ${currentUID}`);
                return true;
            }
        }
        catch (error) {
            log(error);
            // res.sendStatus(401);
            logger.log(`Token Wasn't Verified Successfully.`);
            return false;
        }
    }); */

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createSupportedLocations/
export const createSupportedLocations = onRequest(
    { region: "africa-south1" },
    async (req, res) => {

        const countriesCreation = new CountriesCreation();
        await countriesCreation.createSupportedCountries();
        const provinciesOrStatesCreation = new ProvinciesOrStatesCreation();
        await provinciesOrStatesCreation.createSupportedProvincesOrStates()
        const citiesCreation = new CitiesCreation();
        await citiesCreation.createSupportedCities();
        const townsOrInstitutionsCreation = new TownsOrInstitutionsCreation();
        await townsOrInstitutionsCreation.createSupportedTownsOrInstitutions();
        const areasCreation = new AreasCreation();
        await areasCreation.createSupportedAreas();
        res.json({ result: `Supported Areas Created Successfully.` });
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveHostingAreas
export const saveHostingAreas = onRequest(
    { region: "africa-south1" },
    async (req, res) => {

        let hostingArea;
        let hostingAreaReference;

        // Town/Institution 1
        hostingArea = {
            hostingAreaId: "a4drbsfkrnds48dnmd",
            hostingAreaName: "Umlazi",
            hostingAreaImageURL: "hosting_areas/a4drbsfkrnds48dnmd.jpg",
            sectionName: "D Section-Umlazi-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Kwa Mnyandu (Mobile)",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 2
        hostingArea = {
            hostingAreaId: "b4drbsfkrnds48dnmd",
            hostingAreaName: "MUT",
            hostingAreaImageURL: "hosting_areas/b4drbsfkrnds48dnmd.jpg",
            sectionName: "Mangosuthu (MUT)-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "On Campus (Mobile)",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 3
        hostingArea = {
            hostingAreaId: "c4drbsfkrnds48dnmd",
            hostingAreaName: "DUT",
            hostingAreaImageURL: "hosting_areas/c4drbsfkrnds48dnmd.jpg",
            sectionName: "DUT-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Steve Biko (Mobile)",
        };


        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 4
        hostingArea = {
            hostingAreaId: "d4drbsfkrnds48dnmd",
            hostingAreaName: "UKZN",
            hostingAreaImageURL: "hosting_areas/d4drbsfkrnds48dnmd.jpg",
            sectionName: "Howard College (UKZN)-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Howard College (Mobile)",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 5
        hostingArea = {
            hostingAreaId: "e4drbsfkrnds48dnmd", // Mfazi kamthiza
            hostingAreaName: "Mayville",
            hostingAreaImageURL: "hosting_areas/e4drbsfkrnds48dnmd.jpg",
            sectionName: "Cato Crest-Mayville-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Top City Tavern",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 6
        hostingArea = {
            hostingAreaId: "f4drbsfkrnds48dnmd",
            hostingAreaName: "Sydenham",
            hostingAreaImageURL: "hosting_areas/f4drbsfkrnds48dnmd.jpg",
            sectionName: "Sydenham Height-Sydenham-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Sparks (Mobile)",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Town/Institution 7
        hostingArea = {
            hostingAreaId: "g4drbsfkrnds48dnmd",
            hostingAreaName: "Durban Central",
            hostingAreaImageURL: "hosting_areas/g4drbsfkrnds48dnmd.jpg",
            sectionName: "Berea-Durban Central-Durban-Kwa Zulu Natal-South Africa",
            pickUpArea: "Polar's Liquior",
        };

        hostingAreaReference = getFirestore().collection("hosting_areas")
            .doc(hostingArea.hostingAreaId);

        await hostingAreaReference.set(hostingArea);

        // Send back a message that we"ve successfully written to the db.
        res.json({ result: `All Hosting Areas Are Saved.` });
    });

// Branch : store_resources_crud -> create_resources_store_back_end
/* Each time a new store is created, it has to have a corresponding store name
info document which is responsible for holding information that users
will be seeing, like a store"s current state(hasNoCompetition,
hasUpcommingCompetition, etc.) for example. */
export const createHostInfo = onDocumentCreated({
    document: "/hosting_areas/" +
        "{hostingAreaId}",
    region: "africa-south1"
}, async (event) => {
    // Access the parameter `{storeId}` with `event.params`
    logger.log("From Params Hosting Area ID", event.params.hostingAreaId,
        "From Data Hosting Area ID", event.data.data().hostingAreaId);

    /* Create a document reference in order to associate it id with the
                                stores"s id.*/
    const docReference = getFirestore()
        .collection("hosts_info").doc(event.params.hostingAreaId);

    // Grab the current values of what was written to the stores collection.
    const hostInfo = {
        hostInfoId: event.data.data().hostingAreaId,
        hostingAreaName: event.data.data().hostingAreaName,
        hostingAreaImageURL: event.data.data().hostingAreaImageURL,
        sectionName: event.data.data().sectionName,
        pickUpArea: event.data.data().pickUpArea,
        canAddDraw: true,
        latestHostedDrawId: "-",
        drawsOrder: [],
        notification: null,
    };
    logger.log(`About To Add A Host Info Object With ID
    ${hostInfo.hostInfoId} To The Database.`);

    // Push the new store into Firestore using the Firebase Admin SDK.
    return await docReference.set(hostInfo);
});

export const addNotification = onDocumentCreated(

    {
        document: "/notifications/" +
            "{notificationId}",
        region: "africa-south1"
    }, async (event) => {

        const notification = {
            notificationId: event.data.data().notificationId,
            message: event.data.data().message,
            audience: event.data.data().audience,
            endDate: {
                year: event.data.data().endDate.year,
                month: event.data.data().endDate.month,
                day: event.data.data().endDate.day
            },
            forAll: event.data.data().forAll
        }

        if (notification.forAll) {
            getFirestore().collection("hosts_info").onSnapshot((hostInfoSnapshot) => {
                // const batch = getFirestore().batch();
                hostInfoSnapshot.docs.map(async (hostInfoDoc) => {
                    if (hostInfoDoc.exists) {
                        await hostInfoDoc.ref.update({ notification: notification });
                        // batch.update(storeNameInfoDoc.ref, { notification: notification })
                    }
                })
                // batch.commit()
            })
        } else {
            getFirestore().collection("hosts_info").onSnapshot((hostInfoSnapshot) => {
                hostInfoSnapshot.docs.map(async (hostInfoDoc) => {
                    if (hostInfoDoc.exists) {
                        if (notification.audience.indexOf(hostInfoDoc.id) >= 0) {
                            await storeNameInfoDoc.ref.update({ notification: notification });
                        }
                    }
                })
            })
        }



    });

// declare the function
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Remember to create an index for the function's query.
// onSchedule("*/5 * * * *", async (event) => { */
// Works fine with generated competitions' id, whether or not it does with custom ids depends on the creation of indexes.
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createCompetitions
export const createCompetitions =
    // onSchedule("4, 17, 30 , 43, 56 17 * FRI", async (event) => {
    onRequest(
        {
            region: "africa-south1"
        },
        async (req, res) => {

            try {
                // Consistent timestamp
                const justNow = Timestamp.now().toDate();

                // const justNow = new Date();// Retrieve Current Time.

                // Use the get() method for a read and the onSnapshot() for real time read.
                getFirestore().collectionGroup("hosted_draws").orderBy("hostingAreaName")
                    .where("drawDateAndTime.year",
                        "==", justNow.getFullYear(),
                    )
                    .where("drawDateAndTime.month",
                        "==", justNow.getMonth() + 1, // 1-12
                    )
                    .where("drawDateAndTime.day",
                        "==", justNow.getDate(),
                    )
                    .where("drawDateAndTime.hour",
                        "==", justNow.getHours() + 2, // GTM
                    ) /*
                    .where("drawDateAndTime.minute",
                        "==", justNow.getMinutes() + 1,
                    ) */
                    // Can Be A Bit Tricky If You Think About It.
                    // As a result competitions shouldn't start at o'clock.
                    // Find competitions starting in the next minute.

                    // Index creation is required.
                    .where("drawDateAndTime.minute",
                        "<=", justNow.getMinutes() + 3,
                    )
                    .onSnapshot(async (hostedDrawsSnapshot) => {

                        if (hostedDrawsSnapshot.size > 0) {
                            log(`# No of draws ${hostedDrawsSnapshot.size}`);

                            hostedDrawsSnapshot.docs.map(async (hostedDrawDoc) => {
                                const batch = getFirestore().batch();
                                const townOrInstitution = hostedDrawDoc.data()["townOrInstitution"];

                                /* Only initiate the conversion step if there are
                                groups belonging in a section which is the same
                                as the store draw's.*/
                                getFirestore().collection("groups")
                                    .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                                    .onSnapshot(async (groupsSnapshot) => {
                                        // log(`# No of groups ${groupsSnapshot.size}`);
                                        if (groupsSnapshot.size > 0) {

                                            const hostedDrawId = hostedDrawDoc.data()["hostedDrawId"];

                                            const hostedDraw = {
                                                hostedDrawId: hostedDrawId,
                                                hostingAreaFK: hostedDrawDoc.data()["hostingAreaFK"],
                                                drawDateAndTime:
                                                    hostedDrawDoc.data()["drawDateAndTime"],
                                                joiningFee: hostedDrawDoc.data()["joiningFee"],
                                                numberOfGrandPrices:
                                                    hostedDrawDoc.data()["numberOfGrandPrices"],
                                                numberOfGroupCompetitorsSoFar:
                                                    hostedDrawDoc.data()["numberOfGroupCompetitorsSoFar"],
                                                isOpen: hostedDrawDoc.data()["isOpen"],
                                                hostingAreaName: hostedDrawDoc.data()["hostingAreaName"],
                                                hostingAreaImageURL:
                                                    hostedDrawDoc.data()["hostingAreaImageURL"],
                                                grandPriceToWinIndex:
                                                    hostedDrawDoc.data()["grandPriceToWinIndex"],
                                                townOrInstitution: townOrInstitution,
                                                groupToWinPhoneNumber: hostedDrawDoc.data()["groupToWinPhoneNumber"],
                                            };

                                            const reference = getFirestore()
                                                .collection("competitions")
                                                // .doc();
                                                .doc(hostedDrawId);


                                            const timeBetweenPricePickingAndGroupPicking = pickingMultipleInSeconds * 3;
                                            const displayPeriodAfterWinners = pickingMultipleInSeconds * 10;

                                            /**
                                            * Single Competition Time Interval [Based On 3 Seconds Multiple]
                                            * First 1 minute - Remaining Time Count Down
                                            * Next 18 seconds - Grand Price Picking
                                            * Next 3*3 seconds - Won Price Display
                                            * Next 600 seconds Max - Group Picking
                                            * Next 30 Seconds - Competition Result Display
                                            * Last 3 seconds - Game Over
                                            * Total Time = 1 min + 10 min + 30 sec + 18 sec + 9 sec = 11 min 57 seconds
                                            * Gap Between Competitions - 1 minute
                                            */

                                            const competition = {
                                                competitionId: reference.id,
                                                hostingAreaFK: hostedDraw.hostingAreaFK,
                                                competitionTownOrInstitution: hostedDraw.townOrInstitution,
                                                isLive: true,
                                                dateTime: hostedDraw.drawDateAndTime,
                                                joiningFee: hostedDraw.joiningFee,
                                                numberOfGrandPrices: hostedDraw.numberOfGrandPrices,
                                                isOver: false,
                                                grandPricesGridId: "-",
                                                competitorsGridId: "-",
                                                groupPickingStartTime: -1,
                                                pickingMultipleInSeconds: pickingMultipleInSeconds,
                                                timeBetweenPricePickingAndGroupPicking: timeBetweenPricePickingAndGroupPicking,
                                                displayPeriodAfterWinners: displayPeriodAfterWinners,

                                                grandPricesOrder: [],
                                                isWonGrandPricePicked: false,
                                                competitorsOrder: [],
                                                isWonCompetitorGroupPicked: false,
                                                competitionState: "on-count-down",
                                                wonPrice: null,
                                                wonGroup: null,
                                                grandPriceToWinIndex: hostedDraw.grandPriceToWinIndex,
                                                groupToWinPhoneNumber: hostedDraw.groupToWinPhoneNumber,

                                            };

                                            batch.create(reference, competition);
                                            batch.update(hostedDrawDoc.ref, { hostedDrawState: "converted-to-competition" });
                                            batch.update(hostedDrawDoc.ref, { isOpen: false });
                                            await batch.commit();
                                        }
                                    });
                            });
                        }
                    });

                res.json({ result: `Done Converting Store Draws Into Competitions.` });
            }
            catch (e) {
                logger.log(e);
            } finally {

            }
        });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGrandPricesGrid =
    onDocumentCreated(
        {
            document: "/competitions/{competitionId}",
            region: "africa-south1"
        }, async (event) => {
            const competitionId = event.data.data()["competitionId"];
            const numberOfGrandPrices = event.data.data()["numberOfGrandPrices"];
            const hostingAreaFK = event.data.data()["hostingAreaFK"];
            const grandPriceToWinIndex = event.data.data()["grandPriceToWinIndex"];

            getFirestore()
                .collection("competitions")
                .doc(competitionId)
                .collection("grand_prices_grids")
                .onSnapshot(async (grandPricesGridSnapshot) => {
                    // Only add a new grand price grid if one does not exist yet.
                    if (grandPricesGridSnapshot.size == 0) {
                        /* Convert each drawGrandPrice into a
                            grandPriceToken and save it.*/
                        const reference = getFirestore()
                            .collection("competitions")
                            .doc(competitionId)
                            .collection("grand_prices_grids")
                            .doc();

                        // Step 4
                        let grandPricesOrder = [];

                        // Make sure all grand prices are visited.
                        for (let index = 0; index < numberOfGrandPrices;
                            index++) {
                            grandPricesOrder.push(index);
                        }

                        // Suffle the list to make sure the order is random.
                        grandPricesOrder = shuffle(grandPricesOrder);

                        // Price To Win Index
                        // grandPricesOrder.push(Math.floor(Math.random() * numberOfGrandPrices));
                        if (grandPriceToWinIndex != -1) {
                            grandPricesOrder.push(grandPriceToWinIndex);
                        }
                        else {
                            grandPricesOrder.push(Math.floor(Math.random() * numberOfGrandPrices));
                        }


                        const grandPricesGrid = {
                            grandPricesGridId: reference.id,
                            competitionFK: competitionId,
                            numberOfGrandPrices: numberOfGrandPrices,
                            currentlyPointedTokenIndex: 0,
                            grandPricesOrder: grandPricesOrder,
                            hasStarted: false,
                            hasStopped: false,
                            hostingAreaFK: hostingAreaFK,
                        };

                        await reference.set(grandPricesGrid);

                        const competitionReference = getFirestore().collection("competitions").doc(competitionId);
                        await competitionReference.update({ grandPricesGridId: grandPricesGrid.grandPricesGridId });
                        await competitionReference.update({ grandPricesOrder: grandPricesGrid.grandPricesOrder });

                        const pickingMultipleInSeconds = event.data.data()["pickingMultipleInSeconds"];
                        const timeBetweenPricePickingAndGroupPicking = event.data.data()["timeBetweenPricePickingAndGroupPicking"];
                        const groupPickingStartTime = (grandPricesGrid.grandPricesOrder.length + 1) *
                            pickingMultipleInSeconds + timeBetweenPricePickingAndGroupPicking;

                        await competitionReference.update({ groupPickingStartTime: groupPickingStartTime });
                    }
                });
        });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGrandPricesTokens =
    onDocumentCreated(
        {
            document: "/competitions/" +
                "{competitionId}/grand_prices_grids/" +
                "{grandPriceGridId}",
            region: "africa-south1"
        }, async (event) => {
            const competitionFK = event.data.data()["competitionFK"];
            const grandPricesGridId = event.data.data()["grandPricesGridId"];
            const hostingAreaFK = event.data.data()["hostingAreaFK"];
            const grandPricesOrder = event.data.data()["grandPricesOrder"];

            getFirestore()
                .collection("hosting_areas")
                .doc(hostingAreaFK)
                .collection("hosted_draws")
                .doc(competitionFK)
                .collection("draw_grand_prices")
                .onSnapshot(async (drawGrandPricesSnapshot) => {
                    if (drawGrandPricesSnapshot.size > 0) {
                        drawGrandPricesSnapshot.forEach(
                            async (drawGrandPrice) => {
                                // Remember there are n + 1 elements in the grand prices order list. [n = no of grand prices]
                                if (drawGrandPrice.data().grandPriceIndex == grandPricesOrder[drawGrandPricesSnapshot.size]) {
                                    logger.log(`Grand Price Token - Won Price Index ${grandPricesOrder[drawGrandPricesSnapshot.size]}`);
                                    getFirestore()
                                        .collection("competitions")
                                        .doc(competitionFK).onSnapshot(async (competitionDoc) => {
                                            await competitionDoc.ref.update({
                                                wonPrice: drawGrandPrice.data(),
                                            });
                                        });
                                }

                                const tokenReference =
                                    getFirestore()
                                        .collection("competitions")
                                        .doc(competitionFK)
                                        .collection("grand_prices_grids")
                                        .doc(grandPricesGridId)
                                        .collection("grand_prices_tokens")
                                        .doc();

                                const grandPriceToken = {
                                    grandPriceTokenId:
                                        tokenReference.id,
                                    grandPricesGridFK:
                                        grandPricesGridId,
                                    tokenIndex:
                                        drawGrandPrice.data().grandPriceIndex,
                                    isPointed:
                                        drawGrandPrice.data().grandPriceIndex == 0,
                                    imageURL:
                                        drawGrandPrice.data().imageURL,
                                    description:
                                        drawGrandPrice.data().description,
                                };
                                await tokenReference.set(grandPriceToken);
                            });
                    }
                });
        });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGroupCompetitiorsGrid =
    onDocumentCreated(
        {
            document: "/competitions/{competitionId}",
            region: "africa-south1"
        }, async (event) => {
            const competitionId = event.data.data()["competitionId"];
            const hostingAreaFK = event.data.data()["hostingAreaFK"];
            const townOrInstitution = event.data.data()["competitionTownOrInstitution"];
            const joiningFee = event.data.data()["joiningFee"];
            const groupToWinPhoneNumber = event.data.data()["groupToWinPhoneNumber"];

            getFirestore()
                .collection("competitions")
                .doc(competitionId)
                .collection("group_competitors_grids")
                .onSnapshot(async (groupCompetitorsGridSnapshot) => {
                    // Only add a new group competitors grid if one does not exist yet.
                    if (groupCompetitorsGridSnapshot.size == 0) {
                        getFirestore()
                            .collection("groups")
                            .where("groupArea.townOrInstitutionFK", "==", townOrInstitution.townOrInstitutionNo)
                            .get().then(async (groupsSnapshot) => {
                                if (groupsSnapshot.size > 0) {
                                    const reference = getFirestore()
                                        .collection("competitions")
                                        .doc(competitionId)
                                        .collection("group_competitors_grids")
                                        .doc();

                                    const numberOfGroupCompetitorsSoFar = groupsSnapshot.size;
                                    const groupCompetitorsGridId = reference.id;

                                    let competitorsOrder = new Array();


                                    // Make sure all competitors are visited.
                                    groupsSnapshot.docs.forEach((groupDoc) => {
                                        if (!(groupDoc.id === groupToWinPhoneNumber)) {
                                            if (groupDoc.data()['isActive']) {
                                                competitorsOrder.push(groupDoc.id);
                                            }

                                        }

                                    });

                                    // Make sure competitors are visited randomly.
                                    competitorsOrder = shuffle(competitorsOrder);


                                    // No Group Picking Strategy Applied.
                                    if (groupsSnapshot.size > maxNumberOfGroupCompetitors) {
                                        let newCompetitorsList = [];
                                        for (let i = 0; i < maxNumberOfGroupCompetitors - 1; i++) {
                                            newCompetitorsList.push(competitorsOrder[i]);
                                        }
                                        newCompetitorsList.push(groupToWinPhoneNumber);
                                        competitorsOrder = newCompetitorsList;
                                    }
                                    else {

                                        competitorsOrder.push(groupToWinPhoneNumber);
                                    }

                                    // const hostGroups = groupsSnapshot.docs;
                                    // competitorsOrder = findCompetitorsOrder(groupsSnapshot.docs, townOrInstitution.townOrInstitutionName);

                                    const groupCompetitorsGrid = {
                                        competitorsGridId: groupCompetitorsGridId,
                                        competitionFK: competitionId,
                                        numberOfGroupCompetitors:
                                            numberOfGroupCompetitorsSoFar,
                                        currentlyPointedTokenIndex: 0,
                                        competitorsOrder:
                                            competitorsOrder,
                                        hasStarted: false,
                                        hasStopped: false,
                                        hostingAreaFK: hostingAreaFK,
                                        townOrInstitution: townOrInstitution,
                                    };

                                    await reference.set(groupCompetitorsGrid);

                                    const competitionReference = getFirestore().collection("competitions").doc(competitionId);
                                    await competitionReference.update({ competitorsGridId: groupCompetitorsGrid.competitorsGridId });
                                    await competitionReference.update({ competitorsOrder: groupCompetitorsGrid.competitorsOrder });
                                }
                            });
                    }
                });
        });

// Branch : competition_resources_crud -> create_competition_resources_back_end
export const createGroupCompetitorsTokens =
    onDocumentCreated(
        {
            document: "/competitions/" +
                "{competitionId}/group_competitors_grids/" +
                "{groudCompetitorGridId}",
            region: "africa-south1"
        }, async (event) => {
            const competitionFK =
                event.data.data()["competitionFK"];
            const competitionTownOrInstitution =
                event.data.data()["townOrInstitution"];

            const groupCompetitorsGridId =
                event.data.data()["competitorsGridId"];

            const competitorsOrder = event.data.data()["competitorsOrder"];

            getFirestore()
                .collection("groups")
                .where("groupTownOrInstitution.townOrInstitutionNo", "==", competitionTownOrInstitution.townOrInstitutionNo)
                .onSnapshot(
                    async (groupsSnapshot) => {
                        if (groupsSnapshot.size > 0) {

                            for (let groupIndex = 0; groupIndex <
                                groupsSnapshot.size; groupIndex++) {
                                const groupDoc =
                                    groupsSnapshot.docs.at(groupIndex);

                                // Last Group Wins.
                                if (groupDoc.data().groupCreatorPhoneNumber === competitorsOrder[groupsSnapshot.size - 1]) {
                                    logger.log(`Competitor Token - Group Creator Leader ${competitorsOrder[groupsSnapshot.size - 1]}`);
                                    getFirestore()
                                        .collection("competitions")
                                        .doc(competitionFK).onSnapshot((competitionDoc) => {
                                            competitionDoc.ref.update({
                                                wonGroup: groupDoc.data(),
                                            });
                                        });
                                }

                                const tokenDocReference =
                                    getFirestore()
                                        .collection("competitions")
                                        .doc(competitionFK)
                                        .collection("group_competitors_grids")
                                        .doc(groupCompetitorsGridId)
                                        .collection("group_competitors_tokens")
                                        .doc();

                                const groupCompetitorToken = {
                                    groupCompetitorTokenId:
                                        tokenDocReference
                                            .id,
                                    groupCompetitorsGridFK:
                                        groupCompetitorsGridId,
                                    tokenIndex: groupIndex,
                                    group: groupDoc.data(),
                                };

                                await tokenDocReference
                                    .set(groupCompetitorToken);
                            }
                        }
                    });
        });

/*
const batchWriteTester = (async () => {
  getFirestore().collection("groups")
    .onSnapshot(async (groupsSnapshot) => {
      const batch = getFirestore().batch();
      groupsSnapshot.docs.map((groupDoc) => {
        batch.update(groupDoc.ref, { groupName: 'No Name' });
      });

      logger.debug("batch operation 1...");
      await batch.commit();

    });
});*/

/* Make sure all competitions start at an acceptable time,
like 08:30 for instance.*/
// Branch : competition_resources_crud -> create_competition_resources_back_end
export const maintainCountDownClocks =
    onDocumentCreated(
        {
            document: "/competitions/{competitionId}",
            region: "africa-south1"
        },
        async (event) => {
            const day = event.data.data().dateTime["day"];
            const month = event.data.data().dateTime["month"];
            const year = event.data.data().dateTime["year"];
            const hour = event.data.data().dateTime["hour"];
            const minute = event.data.data().dateTime["minute"];


            const countDownId = `${year}-${month}-${day}@${hour}h${minute}`;

            const reference = getFirestore().collection("count_down_clocks")
                .doc(countDownId);

            reference.onSnapshot(async (snapshot) => {
                if (!snapshot.exists) {
                    // const joiningFee = event.data.data().dateTime["joiningFee"];
                    /**
                     * Single Competition Time Interval [Based On 3 Seconds Multiple]
                     * First 1 minute - Remaining Time Count Down
                     * Next 18 seconds - Grand Price Picking
                     * Next 3*3 = 9 seconds - Won Price Display
                     * Next 600 seconds Max - Group Picking
                     * Next 6 seconds - Display Notification
                     * Next 30 Seconds - Competition Result Display
                     * Last 12 seconds - Game Over
                     * Total Time = 1 min 18 sec + 9 sec+ 10 min + 6 seconds + 30 sec + 12 sec = 12 min 15 seconds
                     * Gap Between Competitions - 1 minute
                     */


                    // Remaining seconds should always start at -60 and stop at 735


                    let second = -pickingMultipleInSeconds * 20; // -60

                    // Maximum = 735
                    const max = pickingMultipleInSeconds * 6 + // Grand Price Picking
                        pickingMultipleInSeconds * 3 + // Won Price Display
                        pickingMultipleInSeconds * maxNumberOfGroupCompetitors + // Group Picking Max Time
                        pickingMultipleInSeconds * 2 + // Display Notification
                        pickingMultipleInSeconds * 10 + // Competition Result Display 
                        pickingMultipleInSeconds * 4; // Game Over

                    reference.set({
                        remainingTime: second,
                    });

                    const timerId = setInterval(async () => {
                        if (second > max) {
                            clearInterval(timerId);
                        }
                        else {
                            second += pickingMultipleInSeconds;
                        }
                        reference.set({
                            remainingTime: second,
                        });

                    }, pickingMultipleInSeconds * 1000);
                }
            });
        });

// Branch : competition_resources_crud -> create_competition_resources_back_end
/* eslint brace-style: ["warn", "stroustrup"]*/
export const setIsLiveForQualifyingCompetitions = onDocumentUpdated(
    {
        document: "/read_only/{readOnlyId}",
        region: "africa-south1"
    }
    , async (event) => {
        const readOnlyId = event.params.readOnlyId;

        const readOnlyReference = getFirestore().collection("read_only")
            .doc(readOnlyId);


        readOnlyReference.onSnapshot(
            async (doc) => {
                // The remaining time for competitions to start.
                const remainingTime = doc.data().remainingTime;

                /* Set isLive to true on corresponding competitions*/
                if (remainingTime == 0) {
                    const datePieces = readOnlyId.split("-");

                    const day = datePieces[0];
                    const month = datePieces[1];
                    const year = datePieces[2];
                    const hour = datePieces[3];
                    const minute = datePieces[4];

                    getFirestore().collection("competitions")
                        .onSnapshot(async (competitionsSnapshot) => {
                            if (competitionsSnapshot.size > 0) {
                                competitionsSnapshot.docs.map(async (competitionDoc) => {
                                    if (competitionDoc.data().dateTime["day"] == day &&
                                        competitionDoc.data().dateTime["month"] == month &&
                                        competitionDoc.data().dateTime["year"] == year &&
                                        competitionDoc.data().dateTime["hour"] == hour &&
                                        competitionDoc.data().dateTime["minute"] == minute) {
                                        // Set competition isLive value to true.
                                        competitionDoc.ref.update({
                                            isLive: true,
                                        });
                                    }
                                });
                            }
                        });
                }
            });
    });

/* eslint max-len: ["off", { "code", 80, "comments": 80 }] */
// Multiple cpus/threads or batch write is needed here, other some won price summaries won be created.
export const createWonPriceSummary =
    onDocumentUpdated(
        {
            document: "/competitions/{competitionId}",
            region: "africa-south1"
        }, async (event) => {

            const reference = getFirestore()
                .collection("competitions")
                .doc(event.params.competitionId);

            reference.onSnapshot((competitionSnapshot) => {
                if (competitionSnapshot.exists) {
                    const isOver = competitionSnapshot.data().isOver;
                    const isLive = competitionSnapshot.data().isLive;

                    if (isOver && isLive) {
                        reference.update({ isLive: false });
                        const wonPriceSummaryId =
                            competitionSnapshot.data().competitionId;
                        const hostingAreaFK =
                            competitionSnapshot.data().hostingAreaFK;

                        const wonPrice = competitionSnapshot.data()["wonPrice"];
                        const wonGroup = competitionSnapshot.data()["wonGroup"];

                        // For Debugging Purposes.
                        const competitorsOrder = competitionSnapshot.data()["competitorsOrder"];
                        const grandPricesOrder = competitionSnapshot.data()["grandPricesOrder"];

                        logger.log(`WonPriceSummary - ${wonGroup.groupCreatorPhoneNumber} ${competitorsOrder}`);
                        logger.log(`WonPriceSummary - ${wonPrice.grandPriceIndex} ${grandPricesOrder}`);

                        const hostingAreaReference = getFirestore()
                            .collection("hosting_areas")
                            .doc(hostingAreaFK);

                        hostingAreaReference.onSnapshot(async (snapshot) => {
                            const hostingAreaName = snapshot.data().hostingAreaName;
                            const hostingAreaImageURL = snapshot.data().hostingAreaImageURL;
                            const sectionName = snapshot.data().sectionName;
                            const pickUpArea = snapshot.data().pickUpArea;


                            const wonPriceSummaryReference =
                                getFirestore()
                                    .collection("won_prices_summaries")
                                    .doc(wonPriceSummaryId);
                            const wonPriceSummary = {
                                wonPriceSummaryId:
                                    wonPriceSummaryId,
                                hostingAreaFK: hostingAreaFK,
                                groupName: wonGroup.groupName,
                                groupSpecificArea: wonGroup.groupSpecificArea,
                                groupTownOrInstitution:
                                    wonGroup.groupTownOrInstitution,
                                groupArea:
                                    wonGroup.groupArea,
                                groupMembers: wonGroup.groupMembers,
                                grandPriceDescription:
                                    wonPrice.description,
                                wonGrandPriceImageURL: wonPrice.imageURL,
                                hostingAreaImageURL: hostingAreaImageURL,
                                hostName: hostingAreaName,
                                storeSection: sectionName,
                                pickUpSpot: pickUpArea,
                                wonDate: competitionSnapshot.data().dateTime,
                                groupCreatorUsername: wonGroup.groupCreatorUsername,
                                groupCreatorImageURL: wonGroup.groupCreatorImageURL,
                                groupCreatorPhoneNumber: wonGroup.groupCreatorPhoneNumber,
                            };

                            // Create won price summary.
                            await wonPriceSummaryReference
                                .set(wonPriceSummary);

                            // Update corresponding store draw.
                            getFirestore()
                                .collection("hosting_areas")
                                .doc(hostingAreaFK)
                                .collection("hosted_draws")
                                .doc(wonPriceSummaryId)
                                .update({
                                    hostedDrawState: "competition-finished"
                                });
                        });
                    }
                }
            });
        });

export const setPostDate = onDocumentCreated(
    {
        document: "/past_posts/{postId}",
        region: "africa-south1"
    }, async (event) => {

        const docReference = getFirestore()
            .collection("past_posts").doc(event.params.postId);

        const dateObject = Timestamp.now().toDate();

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const date = dateObject.getDate();
        const hour = dateObject.getHours() + 2;
        const minute = dateObject.getMinutes();

        const dateMap = {
            'year': year,
            'month': month,
            'date': date,
            'hour': hour,
            'minute': minute
        };

        await docReference.update({ dateCreated: dateMap });
        log('Update Performed...');
    });

export const setRecruitmentHistoryDate = onDocumentCreated(
    {
        document: "/recruitment_history/{recruitmentHistoryId}",
        region: "africa-south1"
    }, async (event) => {

        const docReference = getFirestore()
            .collection("recruitment_history").doc(event.params.recruitmentHistoryId);

        const dateObject = Timestamp.now().toDate();

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1;
        const date = dateObject.getDate();
        const hour = dateObject.getHours() + 2;
        const minute = dateObject.getMinutes();

        const dateMap = {
            'year': year,
            'month': month,
            'date': date,
            'hour': hour,
            'minute': minute
        };

        await docReference.update({ dateCreated: dateMap });
        log('Update Performed...');
    });

// ##################Production Functions [End]########################

// ########Development Functions [Start]###############

// ========================================Create Groups Data[End]========================================

const listAllUsers = async (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                console.log('user', userRecord.toJSON());
            });
            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);

            }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
};

// Marketing Strategy 1-1 : Use Specific Area Residence To Find Contributors.
// Marketing Strategy 1-2 : Use Kids Gift To Find Contributors.
// Marketing Strategy 1-2 : Approach Stores
// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeGroups
export const createFakeGroups = onRequest(
    {
        region: "africa-south1"
    },
    async (req, res) => {

        switch (parseInt(req.query.hostIndex)) {
            case 1:// Umlazi

                await umlaziFakeGroups.umlaziGroups(); // Marketing Strategy 1-1

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All Umlazi Fake Groups Are Saved.` });
                break;
            case 2:// MUT

                await mutFakeGroups.mutGroups(); // Marketing Strategy 1-1

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All MUT Fake Groups Are Saved.` });
                break;
            case 3:// DUT

                await dutFakeGroups.dutBereaGroups(); // Marketing Strategy 1-1
                await dutFakeGroups.dutSydenhamGroups(); // Marketing Strategy 1-1
                await dutFakeGroups.dutMixedGroups(); // Marketing Strategy 1-1

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All DUT Fake Groups Are Saved.` });
                break;
            case 4:// UKZN
                await howardFakeGroups.onCompusGroups();  // Marketing Strategy 1-1

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All   Howard Fake Groups Are Saved.` });
                break;
            case 5:// Mayville

                await mayvilleFakeGroups.catoCrestGroups();  // Marketing Strategy 1-2
                await mayvilleFakeGroups.richviewKoPeachGroups(); // Marketing Strategy 1-1
                await mayvilleFakeGroups.richviewKoYellowGroups(); // Marketing Strategy 1-1
                await mayvilleFakeGroups.richviewKoGreenGroups();  // Marketing Strategy 1-1
                await mayvilleFakeGroups.richviewEmathininiGroups(); // Marketing Strategy 1-1
                await mayvilleFakeGroups.nsimbiniGroups();  // Marketing Strategy 1-1

                // await mayvilleFakeGroups.masxhaGroups();  // Marketing Strategy 1-1

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All Mayville Fake Groups Are Saved.` });
                break;
            case 6:// Sydenham

                await sydenhamFakeGroups.foreman1Groups(); // Marketing Strategy 1-1
                await sydenhamFakeGroups.foreman2Groups(); // Marketing Strategy 1-1

                await sydenhamFakeGroups.burnwoodGroups(); // Marketing Strategy 1-1
                await sydenhamFakeGroups.kennedyGroups();  // Marketing Strategy 1-1
                await sydenhamFakeGroups.palmetGroups();  // Marketing Strategy 1-1

                await sydenhamFakeGroups.sydenhamHeightGroups(); // Marketing Strategy 1-1
                await sydenhamFakeGroups.threeRandGroups(); // Marketing Strategy 1-1
                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All Sydenham Fake Groups Are Saved.` });
                break;
            case 7: // Durban Central
                await durbanCentralFakeGroups.durbanCentralGroups();  // Marketing Strategy 2

                // Send back a message that we"ve successfully written to the db.
                res.json({ result: `All Durban Central Fake Groups Are Saved.` });
        }
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeDraws
export const createFakeDraws = onRequest(
    {
        region: "africa-south1"
    },
    async (req, res) => {
        const drawDateAndTime = new Date();
        const year = drawDateAndTime.getFullYear();
        const month = drawDateAndTime.getMonth() + 1;
        const date = drawDateAndTime.getDate();
        const hour = drawDateAndTime.getHours() + 2;

        const minute = drawDateAndTime.getMinutes() + 4;


        let reference;

        let hostingAreaFK;
        let hostingAreaName;
        let townOrInstitution;
        let groupToWinPhoneNumber;

        // Start listing users from the beginning, 1000 at a time.
        // listAllUsers();

        switch (parseInt(req.query.hostIndex)) {
            case 1: // Umlazi
                hostingAreaFK = "a4drbsfkrnds48dnmd";
                hostingAreaName = "Umlazi";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Umlazi",
                    townOrInstitutionNo: "1",
                };
                groupToWinPhoneNumber = "+27656565656";
                break;
            case 2: // MUT
                hostingAreaFK = "b4drbsfkrnds48dnmd";
                hostingAreaName = "Mangosuthu (MUT)";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Mangosuthu (MUT)",
                    townOrInstitutionNo: "2",
                };
                groupToWinPhoneNumber = "+27819720000";
                break;
            case 3: // DUT
                hostingAreaFK = "c4drbsfkrnds48dnmd";
                hostingAreaName = "DUT";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "DUT",
                    townOrInstitutionNo: "3",
                };
                groupToWinPhoneNumber = "+27703333330";
                break;
            case 4: // UKZN
                hostingAreaFK = "d4drbsfkrnds48dnmd";
                hostingAreaName = "UKZN";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Howard College UKZN",
                    townOrInstitutionNo: "4",
                };
                groupToWinPhoneNumber = "+27803333333";
                break;
            case 5: // Mayville
                hostingAreaFK = "e4drbsfkrnds48dnmd";
                hostingAreaName = "Mayville";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Mayville",
                    townOrInstitutionNo: "5",
                };
                groupToWinPhoneNumber = "+27603333333";
                break;
            case 6: // Sydenham
                hostingAreaFK = "f4drbsfkrnds48dnmd";
                hostingAreaName = "Sydenham";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Sydenham",
                    townOrInstitutionNo: "6",
                };
                groupToWinPhoneNumber = "+27629483938";
                break;
            case 7: // Durban Central
                hostingAreaFK = "g4drbsfkrnds48dnmd";
                hostingAreaName = "Durban Central";
                townOrInstitution = {
                    cityFK: "1",
                    townOrInstitutionName: "Durban Central",
                    townOrInstitutionNo: "7",
                };
                groupToWinPhoneNumber = "+27610000000";
        }


        const hostedDrawId =
            `${year}-${month}-${date}@${hour}h${minute}@${hostingAreaFK}`;

        const draw = {
            "hostedDrawId": hostedDrawId,
            "hostingAreaFK": hostingAreaFK,
            "groupToWinPhoneNumber": groupToWinPhoneNumber,
            "drawDateAndTime": {
                "year": year,
                "month": month,
                "day": date,
                "hour": hour,
                "minute": minute,
            },
            "numberOfGrandPrices": 5,
            "isOpen": true,
            "hostingAreaName": hostingAreaName,
            "hostingAreaImageURL": `${hostingAreaName.toLowerCase()}/hosting_areas/${hostingAreaFK}.jpg`,
            "townOrInstitution": townOrInstitution,
            "joiningFee": 0,
            "hostedDrawState": "not-converted-to-competition",

            "grandPriceToWinIndex": -1,
        };

        reference = getFirestore().collection("hosting_areas")
            .doc(hostingAreaFK).collection("hosted_draws")
            .doc(hostedDrawId);
        await reference.set(draw);


        let grandPrice;
        let extension = '.jpeg';
        for (let priceIndex = 0; priceIndex < draw.numberOfGrandPrices; priceIndex++) {
            reference = getFirestore().collection("hosting_areas")
                .doc(hostingAreaFK).collection("hosted_draws")
                .doc(hostedDrawId).collection("draw_grand_prices")
                // .doc(`${hostedDrawId}-${priceIndex}`);
                .doc(`${priceIndex}`);

            let description;

            // Umlazi
            if (parseInt(req.query.hostIndex) == 1) {
                switch (priceIndex) {
                    case 0:
                        description = "Hunters Dry 24x330ml [Bottles]";
                        break;
                    case 1:
                        description = "Heineken 12x750ml";
                        break;
                    case 2:
                        description = "Corona 12x330ml [Bottles]";
                        break;
                    case 3:
                        description = "Carling Black Label 24x330ml";
                        break;
                    default:
                        description = "Castle Lagar 24x500ml [Cans]";
                }
            }

            // MUT
            else if (parseInt(req.query.hostIndex) == 2) {
                switch (priceIndex) {
                    case 0:
                        description = "Savana Lemon 24x360ml";
                        break;
                    case 1:
                        description = "Heineken 24x330ml [Bottles]";
                        break;
                    case 2:
                        description = "Corona 12x500ml [Cans]";
                        break;
                    case 3:
                        description = "Absolute 750ml";
                        break;
                    default:
                        description = "Black Label Vodka 12x750ml [Box]";
                }
            }

            // DUT
            else if (parseInt(req.query.hostIndex) == 3) {
                switch (priceIndex) {
                    case 0:
                        description = "Hunters Dry 24x330ml [Bottles]";
                        break;
                    case 1:
                        description = "Savana Lemon 24x360ml";
                        break;
                    case 2:
                        description = "Extreme 24x330ml";
                        break;
                    case 3:
                        description = "Absolute 750ml";
                        break;
                    default:
                        description = "Stella Artois";
                }
            }

            // Howard
            else if (parseInt(req.query.hostIndex) == 4) {
                switch (priceIndex) {
                    case 0:
                        description = "Savana Lemon 24x360ml";
                        break;
                    case 1:
                        description = "Heineken 24x330ml [Bottles]";
                        break;
                    case 2:
                        description = "Corona 12x500ml [Cans]";
                        break;
                    case 3:
                        description = "Hunters Gold 24x330ml [Bottles]";
                        break;
                    default:
                        description = "Black Label Vodka 12x750ml [Box]";
                }
            }

            // Mayville
            else if (parseInt(req.query.hostIndex) == 5) {
                switch (priceIndex) {
                    case 0:
                        description = "Carling Black Label 12x750ml";
                        break;
                    case 1:
                        description = "Heineken 12x750ml [Bottles]";
                        break;
                    case 2:
                        description = "Corona 12x360ml [Bottles]";
                        break;
                    case 3:
                        description = "Sminnorf 750ml";
                        break;
                    default:
                        description = "Castle Lagar 24x500ml";
                }
            }

            // Sydenham
            else if (parseInt(req.query.hostIndex) == 6) {

                switch (priceIndex) {
                    case 0:
                        description = "Castle Lagar 24x360ml";
                        break;
                    case 1:
                        description = "Sminnorf 750ml";
                        break;
                    case 2:
                        description = "Absolute 750ml";
                        break;
                    case 3:
                        description = "Carling Black Label 24x330ml";
                        break;
                    default:
                        description = "Savana 24x360ml";
                        extension = '.jpg';
                }
            }

            // Dubran Central
            else if (parseInt(req.query.hostIndex) == 7) {
                switch (priceIndex) {
                    case 0:
                        description = "Corona 24x500ml [Cans]";
                        break;
                    case 1:
                        description = "Heineken 24x330ml [Bottles]";
                        break;
                    case 2:
                        description = "Extreme 24x330ml";
                        break;
                    case 3:
                        description = "Absolute 750ml";
                        break;
                    default:
                        description = "Carling Black Label 24x330ml";
                }
            }

            grandPrice = {
                "grandPriceId": reference.id,
                "hostedDrawFK": hostedDrawId,
                "imageURL": `${hostingAreaName.toLowerCase()}/grand_prices_images/${reference.id}${extension}`,
                "description": description,
                "grandPriceIndex": priceIndex,

            };

            await reference.set(grandPrice);
        }
        const hostInfoReference = getFirestore().collection("hosts_info").doc(hostingAreaFK);


        hostInfoReference.get().then(async (doc) => {
            if (doc.exists) {
                let drawsOrder = doc.data()['drawsOrder'];

                drawsOrder.push(hostedDrawId);
                await hostInfoReference.update({ drawsOrder: drawsOrder });
                drawsOrder = doc.data()['drawsOrder'];
            }
        });

        await hostInfoReference.update({ latestHostedDrawId: hostedDrawId });
        // Send back a message that we"ve successfully written to the db.
        res.json({ result: `Fake Draws Saved.` });
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/createFakeAlcoholics
export const createFakeAlcoholics = onRequest(
    {
        region: "africa-south1"
    }, async (req, res) => {

        // True means use online auth users, otherwise use emulator's.
        fakeAlcoholics.createFakeAlcoholics(false);
        // Send back a message that we"ve successfully written to the db.
        res.json({ result: `Fake Alcoholics Saved.` });
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/updateFakeGroups
export const updateFakeGroups = onRequest(
    {
        region: "africa-south1"
    }, async (req, res) => {
        batchWriteTester();
        res.json({ result: `group batch updated.` });
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveFakeAdmins
export const saveFakeAdmins = onRequest(
    {
        region: "africa-south1"
    },
    async (req, res) => {
        // True means use online auth users, otherwise use emulator's.
        fakeAdmins.createFakeAdmin(false);
        res.json({ result: `Fake Admins Successfully Created.` });
    });

// http://127.0.0.1:5001/alco-dev-15405/africa-south1/saveFakePosts
export const saveFakePosts = onRequest(
    {
        region: "africa-south1"
    },
    async (req, res) => {

        fakePosts.createFakePosts();
        res.json({ result: `Fake Posts Successfully Created.` });

    });

// ########################################Development Functions [End]#######################################################


