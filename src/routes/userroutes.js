const { register, login } = require("../controllers/user");

module.exports = (userrouter) => {
  userrouter.post("/auth/register", register);
  userrouter.post("/auth/login", login);
};
