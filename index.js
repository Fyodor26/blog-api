const express = require("express");
const userRouter = require("./routes/user");
const app = express();
const fs = require("fs");
const { connectDB } = require("./connection");
require("dotenv").config();

// 🔧 Middlewares should be defined before connecting DB and starting server
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 🔧 Routes
app.use("/user", userRouter);

// 🔧 Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ✅ Connect DB and start server
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
