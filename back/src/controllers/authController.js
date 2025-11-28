const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Registration controller
const register = async (req, res) => {
    try {
        // Validate input
        if (!req.body.name || !req.body.email || !req.body.password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const { name, email, password } = req.body;

        // Check if user already exists using email
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });
        // Hash password for more security
        const hashed = await bcrypt.hash(password, 10);
        // Create and save new user in the database
        // const user = new User({ name, email, password: hashed });
        // try {
        const user = await User.create({ name, email, password: hashed });
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        // Send token and user info in response
        res.json({
            token, user: {
                id: user._id, name: user.name, email: user.email,
                preferencesCompleted: user.preferences?.completed ?? false,
            }
        });
        // } catch (err) {
        //     console.log("Error saving user:", err);
        //     res.status(500).json({ msg: "error" });
        // }
        // await user.save();

        // res.json({ message: "User registered successfully" });
        //catch errors
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Login controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if user exists using email
        const user = await User.findOne({ email });
        // If user does not exist, return error
        if (!user) return res.status(404).json({ message: "User not found" });

        //Use hashed password to compare user input
        const match = await bcrypt.compare(password, user.password);
        // If password does not match, return error
        if (!match) return res.status(400).json({ message: "Invalid password" });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        // Send token and user info in response
        res.json({
            token, user: {
                id: user._id, name: user.name, email: user.email,
                preferencesCompleted: user.preferences?.completed ?? false,
            }
        });
        // Catch errors
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };