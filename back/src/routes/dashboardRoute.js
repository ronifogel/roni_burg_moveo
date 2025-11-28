const router = require("express").Router();
const auth = require("../middleware/auth");
const { getDashboard } = require("../controllers/dashboardController");
const { submitVote } = require("../controllers/voteController");

// Dashboard route with authentication
router.get("/", auth, getDashboard);
// Vote submission of dashboard section with authentication
router.post("/vote", auth, submitVote);

module.exports = router;
