const express = require("express");
const upload = require("../middlewares/uploadMiddleware.js");
const { createAdmission, allAdmissions, editAdmission } = require("./AdmissionController.js")
const router = express.Router();
router.post("/create",  createAdmission);
router.get("/list", allAdmissions);
router.put("/:id", upload.single("uploadPhoto"), editAdmission);
module.exports = router;