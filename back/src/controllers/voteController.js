const Vote = require("../models/Vote");

exports.submitVote = async (req, res) => {
    // Extract section and value from request body
    const { section, value } = req.body;

    try {
        // Create and save a new vote in the database
        await Vote.create({
            userId: req.user.id,
            section,
            value
        });

        res.json({ msg: "Vote saved" });
    } catch {
        // Handle errors during vote saving
        res.status(500).json({ msg: "Error saving vote" });
    }
};
