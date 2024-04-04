const express = require("express");
const User = require("../Models/User");

async function userMiddleWare(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    const user = await User.findOne({ username: username, password: password });
    console.log(user);
    if (!user) {
      res.status(404).json({ msg: "You cannot access protected routes" });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
}
module.exports = userMiddleWare;
