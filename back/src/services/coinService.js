const axios = require("axios");

async function getCoinPrices(assets = []) {
  try {
    // Fetch coin prices for specified assets from CoinGecko API
    const ids = assets.join(",");
    const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
    return res.data;
  } catch (err) {
    // Log error and return a fallback response
    return { error: "Failed to fetch coin prices" };
  }
}

module.exports = { getCoinPrices };
