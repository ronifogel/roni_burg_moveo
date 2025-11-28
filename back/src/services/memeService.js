const memes = [
  { url: "https://financefeeds.com/wp-content/uploads/2025/05/Best-Meme-Coins-to-Buy-That-Could-Make-You-a-Crypto-Millionaire.png" },
  { url: "https://public.bnbstatic.com/image/pgc/202502/c01d4161d515611cb3d7d7f2adcbc4de.png" },
  { url: "https://i.imgflip.com/1bij.jpg" },
  { url: "https://i.imgflip.com/4t0m5.jpg" },
  { url: "https://i.imgflip.com/26am.jpg" }
];

function getCryptoMeme() {
  return memes[Math.floor(Math.random() * memes.length)];
}


module.exports = { getCryptoMeme };
