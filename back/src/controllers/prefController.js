const User = require("../models/User");

const prefrence = async (req, res) => {
    try {
        const { assets, investorType, contentTypes } = req.body;
        //Find user by ID and update user preferences in the database
        console.log("Updating preferences for user:", req);
        console.log("Updating preferences for user:", req.user.id);
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                preferences: {
                    assets,
                    investorType,
                    contentTypes,
                    completed: true,
                }
            },
            { new: true }
        );
        // Respond with success message and updated user data
        res.json({ message: "Preferences saved", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { prefrence };