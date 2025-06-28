const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true },
  // email: { type: String, required: true },
  // isEmailVerified: { type: Boolean, default: false},
  refreshToken: { type: String, default: null },
  createdAt: { type: Date, immutable: true, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
