const axios = require("axios");

async function getMarketNews() {
  try {
    // Fetch latest market news from a crypto news API
    const res = await axios.get(`https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.CRYPTO_PANIC_API_KEY}&kind=news`);
    // Return top 5 news articles
    return res.data.results.slice(0, 5);
  } catch (err) {
    console.error("Error fetching market news", err);
    // Fallback to static news if API fails
    return [
      { title: "Crypto markets stable today", source: "Static Backup" }
    ];
  }
}

module.exports = { getMarketNews };
