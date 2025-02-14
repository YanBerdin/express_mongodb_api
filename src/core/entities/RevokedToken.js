const mongoose = require("mongoose");

const RevokedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  revokedAt: {
    type: Date,
    default: Date.now,
  },
});

const RevokedToken = mongoose.model("RevokedToken", RevokedTokenSchema);

module.exports = RevokedToken;
