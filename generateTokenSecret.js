const crypto = require("crypto");

// Générer un TOKEN_SECRET sécurisé
// à l'execution de => node generateTokenSecret.js
const tokenSecret = crypto.randomBytes(32).toString("hex");
console.log(`Votre TOKEN_SECRET est : ${tokenSecret}`);
