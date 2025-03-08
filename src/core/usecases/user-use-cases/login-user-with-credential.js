const MongooseUserRepository = require("../../../infrastructure/repositories/MongooseUserRepository");
// const RevokedToken = require("../entities/RevokedToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../config/config");

class loginUserWithCredentialsUseCase {
  constructor() {
    this.userRepository = new MongooseUserRepository();
    this.saltRounds = 10;
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
}

// export default loginUserWithCredentialsUseCase;
module.exports = loginUserWithCredentialsUseCase;
