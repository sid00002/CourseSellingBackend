const express = require("express");
const Admin = require("../Models/Admin");

async function adminMiddleWare(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    const admin = await Admin.findOne({
      username: username,
      password: password,
    });
    console.log(admin);
    if (!admin) {
      res.status(404).json({ msg: "You cannot access protected routes" });
      return;
    }
    next();
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
}
module.exports = adminMiddleWare;
