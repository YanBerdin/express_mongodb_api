const { validateLogin, validateRegister } = require("../validators");
const { register, login } = require("../controllers/user");

module.exports = (userrouter) => {
  userrouter.post("/auth/register", validateRegister, register);
  userrouter.post("/auth/login", validateLogin, login);
};
