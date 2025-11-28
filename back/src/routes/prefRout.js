const express = require('express');
const { prefrence } = require('../controllers/prefController');
const auth = require('../middleware/auth');

const router = express.Router();
// Handle POST requests to /preference with authentication
router.post('/preference', auth, prefrence);

module.exports = router;