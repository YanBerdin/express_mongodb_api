// Generate TOKEN_SECRET using the following code snippet:
// Move this file to the root directory of the project
// Run in the shell : node generateTokenSecret.js
// Copy the generated token secret to the .env file

const crypto = require("crypto");


const tokenSecret = crypto.randomBytes(32).toString("hex");
console.log(`Votre TOKEN_SECRET est : ${tokenSecret}`);
