const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

//Todo: q1- where to listen? index.js or app.js?
//Todo: handle jwt authentication 

module.exports = app;
