const User = require("../models/User");
const { getMarketNews } = require("../services/marketService");
const { getCoinPrices } = require("../services/coinService");
const { getDailyInsight } = require("../services/aiInsightService");
const { getCryptoMeme } = require("../services/memeService");

exports.getDashboard = async (req, res) => {
    try {
        // Fetch user preferences from the User model, contentTypes from database
        const user = await User.findById(req.user.id);

        const sections = {};
        //If user preferences include Market News fetch and include them in the response
        if (user.preferences.contentTypes.includes("news")) {
            sections.news = await getMarketNews();
        }

        //If user preferences include Charts fetch and include them in the response
        if (user.preferences.contentTypes.includes("prices")) {
            sections.prices = await getCoinPrices(user.preferences.assets);
        }

        //If user preferences include Social fetch and include them in the response
        if (user.preferences.contentTypes.includes("insight")) {
            sections.insight = await getDailyInsight();
        }

        //If user preferences include Fun fetch and include them in the response
        if (user.preferences.contentTypes.includes("fun")) {
            sections.meme = getCryptoMeme();
        }


        res.json(sections);
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};
