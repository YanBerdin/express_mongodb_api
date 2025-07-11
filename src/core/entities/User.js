const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    match: [/\S+@\S+\.\S+/, "is invalid"],
  },
  apiKey: { // TODO: will be used to dynamic tokenSecretGenerated
    type: String,
    unique: true,
    default: null,
  },
  hashedPassword: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
  refreshToken: { type: String },
});

UserSchema.virtual("fullname").get(function () {
  return this.firstName + " " + this.lastName;
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

UserSchema.methods.setAPIKey = async function () {
  this.apiKey = bcrypt.hashSync(this.email, 10); //TODO : remplacer hashSync par hash
  console.log("API Key : ", this.apiKey);
};
/*
UserSchema.methods.setAPIKey = function () {
  this.apiKey = crypto.randomBytes(32).toString("hex");
};
*/
/*
// Proposition de solution
UserSchema.methods.setAPIKey = async function () {
  this.apiKey = await bcrypt.hash(this.email, 10);
};
*/
module.exports = mongoose.model("User", UserSchema);
