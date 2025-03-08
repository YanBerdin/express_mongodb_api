const { validationResult } = require("express-validator");
// const UserUseCases = require("../../../core/usecases/userUseCases");
const RegisterUserWithCredentials = require("../../../core/usecases/user-use-cases/register-user-with-credential");
const loginUserWithCredentialsUseCase = require("../../../core/usecases/user-use-cases/login-user-with-credential");
const LogoutUser = require("../../../core/usecases/user-use-cases/logout-user");


class UserController {
  constructor() {
    // this.userUseCases = new UserUseCases();
    this.registerUserUseCase = new RegisterUserWithCredentials();
    this.loginUserUseCase = new loginUserWithCredentialsUseCase();
    this.logoutUserUseCase = new LogoutUser();
  }

  // POST /auth/register
  register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await this.registerUserUseCase.registerUser(req.body);
      console.log("User registered successfully", user); //TODO: Remove this line
      const userObj = user.toObject();
      delete userObj.hashedPassword;
      res
        .status(201)
        .json({ message: "User registered successfully", user: userObj });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // POST /auth/login
  login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { token } = await this.loginUserUseCase.loginUser(
        req.body.email,
        req.body.password
      );
      res.json({ token });
    } catch (error) {
      const status = error.message.includes("Invalid") ? 401 : 500;
      res.status(status).json({ message: error.message });
    }
  };

  // POST /auth/logout
  logout = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Token manquant ou invalide" });
      }
      const token = authHeader.split(" ")[1];
      const result = await this.logoutUserUseCase.logoutUser(token);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new UserController();
