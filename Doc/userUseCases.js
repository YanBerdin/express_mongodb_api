/*
const MongooseUserRepository = require("../../infrastructure/repositories/MongooseUserRepository");
const RevokedToken = require("../entities/RevokedToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");

class UserUseCases {
  constructor() {
    this.userRepository = new MongooseUserRepository();
    this.saltRounds = 10;
  }

  async registerUser(userData) {
    try {
      // Hash asynchrone du mot de passe
      const hashedPassword = await bcrypt.hash(
        userData.password,
        this.saltRounds
      );
      userData.hashedPassword = hashedPassword;
      delete userData.password;

      // Sauvegarder l'utilisateur via le repository
      let newUser = await this.userRepository.saveUser(userData);
      console.log("newUser", newUser); //TODO: Remove this line

      newUser = await newUser.save();

      return newUser;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }

  async loginUser(email, password) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new Error("Invalid email or password");
      }
      // Vérification asynchrone du mot de passe
      const isMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!isMatch) {
        throw new Error("Invalid email or password");
      }
      const token = jwt.sign(
        {
          email: user.email,
          fullName: user.fullName,
          _id: user._id,
        },
        config.tokenSecret,
        { expiresIn: "15m" }
      );
      return { token };
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  async logoutUser(token) {
    try {
      const existingToken = await RevokedToken.findOne({ token });
      if (existingToken) {
        throw new Error("Token already revoked");
      }
      await RevokedToken.create({ token });
      return { message: "Token revoked successfully" };
    } catch (error) {
      throw new Error(`Error revoking token: ${error.message}`);
    }
  }
}

module.exports = UserUseCases;
*/