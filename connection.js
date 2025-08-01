const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB(url) {
  return mongoose.connect(url);
}

module.exports = { connectDB };
