const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createCourse,
} = require("./controller.js");


router.route("/").get(getAllCourses).post(createCourse);

router
  .route("/:courseId")
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

module.exports = router;
