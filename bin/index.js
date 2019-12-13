#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const axios = require("axios");


const boxenOptions = {
 padding: 1,
 margin: 1,
 borderStyle: "round",
 borderColor: "green",
 backgroundColor: "#555555"
};



const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .option("s", { alias: "search", describe: "Search term", type: "string" })
 .argv;

const greeting = `Hello, ${options.name}!`;

console.log(greeting);

const greetingBox = chalk.white.bold(greeting);
const msgBox = boxen( greetingBox, boxenOptions );

console.log(msgBox);

if (options.search) {
 console.log(`Searching for jokes about ${options.search}...`)
} else {
 console.log("Here's a random joke for you:");
}



const url = options.search ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}` : "https://icanhazdadjoke.com/";


axios.get(url, { headers: { Accept: "application/json" } })
 .then(res => {
   if (options.search) {
     // if searching for jokes, loop over the results
     res.data.results.forEach( j => {
       console.log("\n" + j.joke);
     });
     if (res.data.results.length === 0) {
       console.log("no jokes found :'(");
     }
   } else {
     console.log(res.data.joke);
   }
 });