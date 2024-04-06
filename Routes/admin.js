const express = require("express");
const router = express.Router();
const adminMiddleWare = require("../Middleware/admin");
const validateUserInput = require("../Validations/validations");
const Admin = require("../Models/Admin");
const Course = require("../Models/Course");
const jwt = require("jsonwebtoken");

// signup route for admin
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const response = validateUserInput({ username, password });
    if (!response.success) {
      res.status(411).json({ msg: "Invalid credentials entered" });
      return;
    }
    const admin = new Admin({
      username: username,
      password: password,
      createsCourses: [],
    });
    const result = await admin.save();
    res.status(200).json({ msg: "Admin created successfully" });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

//signin route for admin
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const response = validateUserInput({ username, password });
    if (!response.success) {
      res.status(411).json({ msg: "Invalid credentials entered" });
      return;
    }
    const existUser = await Admin.findOne({
      username,
      password,
    });

    if (existUser) {
      const token = jwt.sign({ username }, process.env.JWT_PASS);
      res.status(200).json({ token });
    }
    res.status(411).json({ msg: "User is Invalid" });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

//admin can post a new course
router.post("/courses", adminMiddleWare, async (req, res) => {
  const title = req.body.title;
  const desciption = req.body.desciption;
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  try {
    const newCourse = new Course({
      title: title,
      desciption: desciption,
      price: price,
      imageLink: imageLink,
      published: true,
    });
    const course = await newCourse.save();
    res.status(200).json({ ms: "Course created successfully" });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

//admin can see all the courses
router.get("/courses", adminMiddleWare, async (req, res) => {
  try {
    const coursesArray = await Course.find();
    console.log(coursesArray);
    res.status(200).json(coursesArray);
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

module.exports = router;
