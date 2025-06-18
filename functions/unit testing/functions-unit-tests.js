/* eslint-disable*/
// after firebase-functions-test has been initialized
// relative path to functions code
// import myFunctions from '../index.js';
// const test = require("firebase-functions-test\n")({
require("firebase-functions-test")({
  // I'm not sure about the below line.
  databaseURL: "https://alco-dev-3fd77.firebaseio.com",
  storageBucket: "alco-dev-3fd77.firebasestorage.app",
  projectId: "alco-dev-3fd77",
  // The path need to use '\\' instead of '/'.
}, "C:\\Users\\Lwandile-Ganyile\\Documents\\Lwandile Ganyile\\Alco-Dev\\alco_dev\\alco-dev-credentials.json",
);
