
const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  createCourse,
  getFeesData,
  getCourseNames,
} = require("./controller.js");

router.route("/").get(getAllCourses).post(createCourse);

router.route("/feeFilter").get(getFeesData);
router.route("/getCoursesByCategory").get(getCourseNames);

router
  .route("/:courseId")
  .get(getCourseById)
  .put(updateCourseById)
.delete(deleteCourseById);

module.exports = router;