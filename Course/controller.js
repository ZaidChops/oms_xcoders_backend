const Course = require("./model.js");
const Counter = require("../models/counterModel.js")
// const ExpressErrorHandler = require("../middleware/ExpressErrorHandler.js");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});

    return res
      .status(200)
      .json({ success: true, messsage: "Courses fetch ", data: courses });
  } catch (error) {
    // next(new ErrorHandler(500, "Error occurs while getting courses.", error));
    res.status(500).json({
      success: false,
      message: "wrong",
    });
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { name, category, courseDuration, fee } = req.body;

    // Validate required fields
    if (!name || !category || !courseDuration || !fee) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "courseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const courseId = `XCE${String(counter.seq).padStart(3, "0")}`;

    // Create a new course
    const course = await Course.create({
      courseId,
      name,
      category,
      courseDuration,
      fee,
    });

    return res.status(201).json({
      success: true,
      message: "Course created Successfully",
      course,
    });
  } catch (error) {
    // next(new ExpressErrorHandler(500, "Error creating course.", error));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ courseId });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Id not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course retrieved successfully.",
      course,
    });
  } catch (error) {
    // next(
    //   new ExpressErrorHandler(
    //     500,
    //     "Error occurs on getting courses data.",
    //     error
    //   )
    // );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findOneAndUpdate({ courseId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Id not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Course Update Successfully", course });
  } catch (error) {
    //   next(new ExpressErrorHandler(500, "Error while Update course", error));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { courseId } = req.params();
    const course = await Course.findOneAndDelete({ courseId });
    if (!courseId) {
      return res
        .status(404)
        .json({ success: false, message: "Course Id not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course,
    });
  } catch (error) {
    // next(new ExpressErrorHandler(500, "Error on deleting course", error));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
};
