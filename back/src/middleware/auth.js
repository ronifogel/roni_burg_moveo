const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    //If token does not exist, unauthorized
    if (!token) return res.status(401).json({ error: "No token" });

    try {
        // Verify token and extract user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // contains user id & email
        req.user = decoded; 
        // Proceed to next controller
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
};