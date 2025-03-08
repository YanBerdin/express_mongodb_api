const MongooseUserRepository = require("../../../infrastructure/repositories/MongooseUserRepository");
const RevokedToken = require("../../entities/RevokedToken");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("../../config/config");

class logoutUserUseCase {
  constructor() {
    this.userRepository = new MongooseUserRepository();
    this.saltRounds = 10;
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

// export default logoutUserUseCase;
module.exports = logoutUserUseCase;