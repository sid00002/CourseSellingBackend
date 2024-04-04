const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    desciption: {
      type: String,
    },
    price: {
      type: Number,
    },
    imageLink: {
      type: String,
    },
    published: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Course", courseSchema);
