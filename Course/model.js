const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
  {
    courseId: {
      type: String,
      unique: true,
      default: "XCC",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Job Guaranted Program",
        "Mastery Program",
        "Foundation Program",
        "IPB Program", //Interview Preparation Bootcamp
        "Crash Courses",
      ],
      required: [true, "Category is required."],
    },
    courseDuration: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);


