const express = require("express");
const { createTrainer , fetchTrainers, editTrainer} = require("./controller");

const router = express.Router();

// Use the createTrainer function in your routes
router.post("/", createTrainer);
router.get("/", fetchTrainers);
// router.get("/read/:trainerId", getTrainerById);
router.put("/:trainerId", editTrainer);
// router.delete("/delete/:trainerId", deleteTrainer);

module.exports = router;
