const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { validateLogin, validateRegister } = require("../validators");
jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/User");
const RevokedToken = require("../models/RevokedToken");

const saltRounds = 10; // Number of rounds to generate salt
const salt = bcrypt.genSaltSync(saltRounds); // Generate salt

module.exports = {
  /**
   * @route POST /auth/register
   * @summary Register a new user
   * @tags Auth
   * @param {RegisterRequest} request.body.required - User's information
   * @return {object} 201 - Successful registration response
   * @example response - 201 - Example success response
   * {
   *  "message": "User registered successfully",
   * "user": {
   *  "email": "JohnDoe@gmail.com"
   * "fullName": "John Doe",
   * "_id": "12345"
   * }
   * }
   */
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = await new User(req.body);
      newUser.hashedPassword = bcrypt.hashSync(req.body.password, salt);

      // Génération de l'API key en appelant la méthode sur le modèle User
      newUser.setAPIKey();
      await newUser.save();
      const userObj = newUser.toObject(); // Convert Mongoose object to plain JavaScript object
      delete userObj.hashedPassword; // Delete hashed password from user object before sending it back
      res
        .status(201)
        .json({ message: "User registered successfully", user: userObj });
    } catch (error) {
      res.json("Error while registering new account :" + error);
    }
  },

  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findOne({ email: req.body.email });
      console.log("Login => user", user); //TODO: Remove this line
      if (!user) {
        res.status(401).json("No user account found");
      }
      const match = user.comparePassword(req.body.password);

      if (!match) {
        res.status(401).json("Authentication failed. Invalid user or password");
      }
      return res.json({
        token: jwt.sign(
          // Generate token
          {
            email: user.email,
            fullName: user.fullName,
            _id: user._id,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "15m" }
        ),
      });
    } catch (error) {
      res.json(error);
    }
  },

  /**
   * @route POST /auth/logout
   * @summary User logout
   * @tags Auth
   * @return {object} 200 - Successful logout response
   * @example response - 200 - Example success response
   * {
   * "message": "User logged out successfully"
   * }
   */
  async logout(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Token manquant ou invalide" });
      }

      const token = authHeader.split(" ")[1];

      const existingRevokedToken = await RevokedToken.findOne({ token });
      if (existingRevokedToken) {
        return res.status(400).json({ message: "Token déjà révoqué" });
      }

      // Ajouter le token à la liste des tokens révoqués
      await RevokedToken.create({ token });

      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la déconnexion",
        error: error.message,
      });
    }
  },
};
