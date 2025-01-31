const express = require("express");
const { createTrainer , getAllTrainers, updateTrainer,deleteTrainer} = require("./trainerController");

const router = express.Router();

// Use the createTrainer function in your routes
router.post("/create", createTrainer);
router.get("/list", getAllTrainers);
// router.get("/read/:trainerId", getTrainerById);
router.put("/update/:trainerId", updateTrainer);
router.delete("/delete/:trainerId", deleteTrainer);

module.exports = router;
