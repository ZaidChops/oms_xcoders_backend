const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: "XCC",
    },
    courseName: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    courseCategory: {
      type: String,
      enum: [
        "Job Guaranted Program",
        "Mastery Program",
        "MNC Expert Program",
        "Foundation Program",
        "IPB Program", //Interview Preparation Bootcamp
        "Crash Courses Program",
      ],
      required: [true, "Category is required."],
    },
    
    courseDuration: {
      type: String,
      required: true,
    },
    courseFee: {
      type: Number,
      required: true,
    },
    courseDiscount: {
      type: Number
    },
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);


