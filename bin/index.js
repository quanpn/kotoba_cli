#!/usr/bin/env node
const yargs = require("yargs");
var admin = require("firebase-admin");

const options = yargs
 .usage("Usage:  [command] [param]")
 .option("e", { alias: "export", describe: "Export a collection", type: "string", demandOption: true })
 .argv;

if (options.export) {
 console.log(`Doing export ${options.export}...`)
} else {
 console.log("There is not any command...Do nothing");
}

var serviceAccount = require("./cert/kotoba-1042b-firebase-adminsdk-pspi7-bedf63e907.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kotoba-1042b.firebaseio.com"
});
