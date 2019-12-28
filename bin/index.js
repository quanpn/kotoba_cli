#!/usr/bin/env node
const yargs = require("yargs");
var admin = require("firebase-admin");
var firestoreLib = require("node-firestore-import-export");
var loadJsonFile = require("load-json-file");
var fs = require("fs");

const options = yargs
  .usage("Usage:  [command] [param]")
  .option("s", { alias: "service_account", describe: "Path to a JSON file with your service account credentials.", type: "string", demandOption: true })
  .option("n", { alias: "node", describe: "Node collection need do export/import", type: "string", demandOption: true })
  .option("e", { alias: "export", describe: "Path to file to export a collection", type: "string" })
  .option("i", { alias: "import", describe: "Path to file to import a collection", type: "string" })
  .argv;

if (options.export) {
  console.log(`Doing export to ${options.export}...`)
} else if (options.import) {
  console.log(`Doing import from ${options.import}...`)
} else {
  console.log("There is not any command...Do nothing");
  process.exit(1);
}

/*
Using default cert by command
export GOOGLE_APPLICATION_CREDENTIALS=/workspace/kotoba_cli/cert/key.json 
*/
var serviceAccount = require(options.service_account);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kotoba-1042b.firebaseio.com"
});



var collection = admin.firestore().collection(options.node);

if (options.export) {
  firestoreLib.firestoreExport(collection)
    .then(data => {
      let stringResults;

      stringResults = JSON.stringify(data, null, 2);

      return stringResults;
    })
    .then(jsonData => {
      fs.writeFile(options.export, jsonData, 'utf8', err => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Results were saved to ${options.export}`);
          return;
        }
      });
    }).catch((error) => {
      if (error instanceof Error) {
        console.log(error.message);
        process.exit(1);
      } else {
        console.log(error);
      }
    })
    ;



} else if (options.import) {
  loadJsonFile(options.import).then((data) =>
    firestoreLib.firestoreImport(data, collection, true)
      .then(() => {
        console.log('All done 🎉');
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log(`${error.name}: ${error.message}`);
          console.log(error.stack.toString());
          process.exit(1);
        } else {
          console.log(error);
        }
      })
  );


}


