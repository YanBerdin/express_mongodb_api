/*
const User = require("../models/User");
  
  async generateAPIKey(req, res) {
    try {
      const user = await User.findOne({ email: req.user.email });
      user.setAPIKey();
      await user.save();
      res.setHeader("x-api-key", user.apiKey); // Ajouter l'API key au header
      console.log("API key generated: ", user.apiKey); //TODO: Remove this line
      console.log(req.headers); //TODO: Remove this line
      res.json({ apikey: user.apiKey });
    } catch (error) {
      res.json(error);
    }
  }

  module.exports = generateAPIKey;
  */