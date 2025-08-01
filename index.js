const express = require("express");
const userRouter = require("./routes/user");
const app = express();
const port = 3000;
const fs = require("fs");
const { connectDB } = require("./connection");

connectDB("mongodb://127.0.0.1:27017/blog-api")
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
