const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoute = require("./Routes/users");
const adminRoute = require("./Routes/admin");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/users", userRoute);
app.use("/admin", adminRoute);

app.listen(3001, () => {
  console.log("app running on a port 3001");
});
