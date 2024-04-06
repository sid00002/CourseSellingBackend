const express = require("express");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

async function userMiddleWare(req, res, next) {
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    await jwt.verify(token, process.env.JWT_PASS, (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      console.log("data", data);
      req.username = data.username;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error verying token", error: error });
  }
}
module.exports = userMiddleWare;
