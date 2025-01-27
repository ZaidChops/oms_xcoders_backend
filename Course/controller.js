const Course = require("./model.js");
const Counter = require("../models/counterModel.js");
// const ExpressErrorHandler = require("../middleware/ExpressErrorHandler.js");

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({})

    return res
      .status(200)
      .json({ success: true, messsage: "Courses fetch ",
        courses:courses });
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
    const { courseName, courseCategory, courseDuration, courseFee, courseDiscount } = req.body;

    // Validate required fields
    if (!courseName || !courseCategory || !courseDuration || !courseFee) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "courseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const courseId = `XCC${String(counter.seq).padStart(3, "0")}`;
    // console.log(courseId)

    // Create a new course
    const course = await Course.create({
      courseId,
      courseName,
      courseCategory,
      courseDuration,
      courseFee,
      courseDiscount
    });

    return res.status(201).json({
      success: true,
      message: "Course created Successfully",
      course:course,
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

    console.log(courseId);

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
      .json({ success: true, message: "Course Update Successfully", course:course });
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
      course:course,
    });
  } catch (error) {
    // next(new ExpressErrorHandler(500, "Error on deleting course", error));
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeesData = async (req, res) => {
  const { courseName, courseCategory } = req.body;

  try {
    const course = await Course.findOne({ courseName, courseCategory });
    console.log(course);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found " });
    }

    return res.status(200).json({
      success: true,
      message: "Course fee get successfully",
      courseFee: course.courseFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseNames = async (req, res) => {
  const courseCategory = req.body;
  console.log(courseCategory);

  try {
    const courses = await Course.find(courseCategory);

    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "Course category or course name not found ",
      });
    }
    const courseNames = courses.map((course) => course.courseName);

    console.log(courseNames);

    return res.status(200).json({
      success: true,
      message: "all Course name get successfully",
      courseNames: courseNames,
    });
  } catch (error) {
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
  getFeesData,
  getCourseNames,
};
