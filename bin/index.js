#!/usr/bin/env node
const yargs = require("yargs");
var admin = require("firebase-admin");

const options = yargs
 .usage("Usage:  [command] [param]")
 .option("e", { alias: "export", describe: "Export a collection", type: "string"})
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

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

