const axios = require("axios");

async function getDailyInsight() {
    try {
        // Call to OpenRouter API to get daily crypto insight
        const res = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
            model: "x-ai/grok-4.1-fast:free",
            messages: [
                {
                    role: "user",
                    // The prompt asking for crypto insight
                    content: "Give one short crypto insight of the day:"
                }
            ],
            stream: false
        },
            {
                // Request headers including authorization with API key
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            });
        return res.data.choices[0].message.content;
    } catch (err) {
        // Log error and return a fallback message
        console.error("Error fetching AI insight", err);
        return "AI Insight unavailable. Market seems steady today.";
    }
}

module.exports = { getDailyInsight };
