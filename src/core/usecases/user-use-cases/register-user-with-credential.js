const MongooseUserRepository = require("../../../infrastructure/repositories/MongooseUserRepository");
const RevokedToken = require("../../entities/RevokedToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class registerUserWithCredentialsUseCase {
  constructor() {
    this.userRepository = new MongooseUserRepository();
    this.saltRounds = 10;
  }

  async registerUser(userData) {
    try {
      const hashedPassword = await bcrypt.hash(
        userData.password,
        this.saltRounds
      );
      userData.hashedPassword = hashedPassword;
      delete userData.password;

      let newUser = await this.userRepository.saveUser(userData);
      console.log("newUser", newUser); //TODO: Remove this line

      //? user.save() est déjà effectué,dans UserRepositoryInterface
      // newUser = await newUser.save();

      return newUser;
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }
}

module.exports = registerUserWithCredentialsUseCase;
// export default registerUserWithCredentialsUseCase;
