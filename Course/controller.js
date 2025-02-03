const Course = require("./model.js");
const {Counter} = require("../models/counterModel.js");
const { pagination } = require("../utils/pagination.js");

const getAllCourses = async (req, res) => {
  try {
    let { page = 1, limit = 2 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    
    const courseData = await pagination(Course, page, limit);

    return res
      .status(200)
      .json({
        success: true,
        message: "Courses fetched successfully",
        courseData: courseData,
      });
  } catch (error) {
    // next(new ErrorHandler(500, "Error occurs while getting courses.", error));
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
    });
  }
};

const createCourse = async (req, res, next) => {
  try {
    const { courseName, courseCategory, courseDuration, courseFee, courseDiscount } = req.body;

    if (!courseName || !courseCategory || !courseDuration || !courseFee) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "courseId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const courseId = `XCC${String(counter.seq).padStart(3, "0")}`;

    const course = await Course.create({
      courseId,
      courseName,
      courseCategory,
      courseDuration,
      courseFee,
      courseDiscount,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course retrieved successfully.",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updates = req.body;

    const course = await Course.findOneAndUpdate({ courseId }, updates, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOneAndDelete({ courseId });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getFeesData = async (req, res) => {
  const { courseName, courseCategory } = req.query;

  try {
    const course = await Course.findOne({ courseName, courseCategory });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Course fee retrieved successfully",
      course: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseNames = async (req, res) => {
  const { courseCategory } = req.query;

  try {
    const query = courseCategory ? { courseCategory } : {};
    const courses = await Course.find(query);

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for the given category",
      });
    }

    const courseNames = courses.map((course) => course.courseName);

    return res.status(200).json({
      success: true,
      message: "Course names retrieved successfully",
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
