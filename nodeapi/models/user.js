const mongoose = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  hashed_password: {
    type: String,
    require: true,
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password, this.salt);
  })
  .get(() => {
    return this._password;
  });

userSchema.methods = {
  encryptPassword: (password, salt) => {
    if (!password) return "";
    try {
      return crypto.createHmac("sha1", salt).update(password).digest("hex");
    } catch (err) {
      console.log(err);
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
