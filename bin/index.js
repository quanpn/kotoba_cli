#!/usr/bin/env node
const yargs = require("yargs");

const options = yargs
 .usage("Usage:  [command] [param]")
 .option("e", { alias: "export", describe: "Export a collection", type: "string", demandOption: true })
 .argv;

if (options.export) {
 console.log(`Doing export ${options.export}...`)
} else {
 console.log("There is not any command...Do nothing");
}
