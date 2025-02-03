const express = require("express");
const { createTrainer , fetchTrainers, editTrainer, deleteTrainer} = require("./controller");

const router = express.Router();

router.post("/", createTrainer);
router.get("/", fetchTrainers);
router.put("/:trainerId", editTrainer);
router.delete("/:trainerId", deleteTrainer);

module.exports = router;
