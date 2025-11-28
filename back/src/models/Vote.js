const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
  userId: String,
  //["news", "prices", "insight" , "fun"]
  section: String,
  // upvote = 1, downvote = -1
  value: Number, 
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", VoteSchema);
