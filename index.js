const App = require("./src/config/app");

// Récupère l'instance Express
const app = new App().getApp();

module.exports = app;
