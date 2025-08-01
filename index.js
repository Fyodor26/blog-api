const express = require("express");
const userRouter = require("./routes/user");
const app = express();
const port = process.env.PORT || 3000;
const fs = require("fs");
const { connectDB } = require("./connection");
require("dotenv").config();

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRouter);
app.listen(port, () => {
  console.log("listining on port 3000");
});
