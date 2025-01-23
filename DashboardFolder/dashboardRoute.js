const express = require("express");
const { getDashboardStats } = require("./dashboardController.js");
const router = express.Router();
router.get("/stats", getDashboardStats);
module.exports = router;