const jwt = require("jsonwebtoken");
const RevokedToken = require("../../../core/entities/RevokedToken");

const authorize = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers); //TODO Remove
  console.log(req.headers.authorization); //TODO Remove

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  if (!authHeader || !authHeader.split(" ")[0] === "Bearer") {
    return res.status(401).json({ message: "Utilisateur non authentifié" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const revokedToken = await RevokedToken.findOne({ token });
    if (revokedToken) {
      return res.status(401).json({ message: "Token révoqué" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "authorize:  Utilisateur non authentifié" });
  }
};

module.exports = authorize;
