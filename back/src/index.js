// Use the configured Express app (routes, CORS, middleware) from app.js
const app = require('./app');
//Define the port to listen on
const PORT = process.env.PORT || 3000;
//Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});