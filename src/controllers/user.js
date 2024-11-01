const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { validateLogin, validateRegister } = require("../validators");
jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

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
      res.status(201).json({ message: "User registered successfully", user: userObj });
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
          process.env.TOKEN_SECRET
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
};
