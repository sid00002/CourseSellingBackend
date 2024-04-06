const express = require("express");
const userMiddleWare = require("../Middleware/user");
const router = express.Router();
const validateUserInput = require("../Validations/validations");
const User = require("../Models/User");
const Course = require("../Models/Course");
const jwt = require("jsonwebtoken");

// sign up route for User
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const response = await validateUserInput({ username, password });
    if (!response.success) {
      res.status(411).json({ msg: "Invalid credentials entered" });
      return;
    }
    const user = new User({
      username: username,
      password: password,
      purchasedCourses: [],
    });
    const result = await user.save();
    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
});

//signin route for user
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const response = validateUserInput({ username, password });
    if (!response.success) {
      res.status(411).json({ msg: "Invalid credentials entered" });
      return;
    }
    const existUser = await User.findOne({
      username: username,
      password: password,
    });
    if (existUser) {
      const token = jwt.sign({ username }, process.env.JWT_PASS);
      res.status(200).json({ token });
    } else {
      res.status(411).json({ msg: "User is Invalid" });
    }
  } catch (error) {
    res.status(403).json({ msg: "Exits" });
  }
});

// list of course user can see
router.get("/courses", userMiddleWare, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

//buy a course for user
router.post("/courses/:courseId", userMiddleWare, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.username;
  try {
    await User.updateOne(
      { username: username },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
    res.status(200).json({ msg: "Course purchased successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

// get list of purchased course
router.get("/purchasedCourses", userMiddleWare, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username: username });
    const purchasedCourses = user.purchasedCourses;
    res.status(200).json(purchasedCourses);
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

module.exports = router;
