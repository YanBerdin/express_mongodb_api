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
  async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newUser = await new User(req.body);
      newUser.hashedPassword = bcrypt.hashSync(req.body.password, salt);
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

  async generateAPIKey(req, res) {
    try {
      const user = await User.findOne({ email: req.user.email });
      user.setAPIKey();
      await user.save();
      res.json({ apikey: user.apiKey });
    } catch (error) {
      res.json(error);
    }
  },

  async logout(req, res) {
    try {
      const user = req.user; // User extrait du token JWT
      if (user) {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];
          await RevokedToken.create({ token }); // Ajouter le jeton à la liste de révocation en BDD
        }
        // Si sessions, détruire la session
        if (req.session) {
          req.session.destroy((err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Erreur lors de la déconnexion" });
            }
            res.status(200).json({ message: "Déconnexion réussie" });
          });
        } else {
          // Si pas de session, simplement envoyer une réponse de succès
          res.status(200).json({ message: "Déconnexion réussie" });
        }
      } else {
        res.status(401).json({ message: "Utilisateur non authentifié" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Erreur lors de la déconnexion",
        error: error.message,
      });
    }
  },
};
