const mongoose = require("mongoose");

// User schema definition
const userSchema = new mongoose.Schema({
  // Basic user info from registration
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // User preferences schema from quiz
  preferences: {
    assets: [String],
    investorType: String,
    contentTypes: [String],
    completed: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model("User", userSchema);