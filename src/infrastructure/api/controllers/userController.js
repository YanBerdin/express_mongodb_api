const { validationResult } = require("express-validator");
const UserUseCases = require("../../../core/usecases/userUseCases");

class UserController {
  constructor() {
    this.userUseCases = new UserUseCases();
  }

  register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const user = await this.userUseCases.registerUser(req.body);
      console.log("User registered successfully", user); //TODO: Remove this line
      const userObj = user.toObject();
      delete userObj.hashedPassword;
      res.status(201).json({ message: "User registered successfully", user: userObj });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const { token } = await this.userUseCases.loginUser(req.body.email, req.body.password);
      res.json({ token });
    } catch (error) {
      const status = error.message.includes("Invalid") ? 401 : 500;
      res.status(status).json({ message: error.message });
    }
  };

  logout = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Token manquant ou invalide" });
      }
      const token = authHeader.split(" ")[1];
      const result = await this.userUseCases.logoutUser(token);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new UserController();
