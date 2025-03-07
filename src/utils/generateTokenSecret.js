// Generate TOKEN_SECRET using the following code snippet:
// Run in the shell : node utils/generateTokenSecret.js
// Paste the generated token secret to the .env file

const crypto = require("crypto");


const tokenSecret = crypto.randomBytes(32).toString("hex");
console.log(`Votre TOKEN_SECRET est : ${tokenSecret}`);
