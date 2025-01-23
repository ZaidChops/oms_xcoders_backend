const { Trainer } = require("./trainerModel.js");
const { Counter } = require("../models/counterModel.js");
const createHttpError = require("http-errors");

const createTrainer = async (req, res, next) => {
  try {
    const { name, email, techStack, contact } = req.body;

    // Validations
    if (!name || !email || !techStack) {
      return res.status(400).json({
        message: "Name, Email, Tech Stack, Course, Date, Timing, and Duration are required.",
      });
    }

    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return next(createHttpError(400, "This trainer is already registered."));
    }

    // Get the next sequence for trainerId
    const counter = await Counter.findOneAndUpdate(
      { name: "trainerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const trainerId = `XCT${String(counter.seq).padStart(3, "0")}`;

    // Create the new trainer
    const trainer = await Trainer.create({
      trainerId,
      name,
      techStack,


      email,
      contact,

    });

    return res.status(201).json({
      message: "Trainer Created Successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    return next(createHttpError(500, "Error when creating new trainer.", error));
  }
};

const getAllTrainers = async (req, res, next) => {
  try {
    const trainers = await Trainer.find();

    // No additional formatting for date, timing, or timeDuration
    res.status(200).json({
      success: true,
      trainers,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching trainers.", error));
  }
};

const updateTrainer = async (req, res, next) => {
  const { trainerId } = req.params;
  const updates = req.body;

  try {
    const trainer = await Trainer.findOneAndUpdate({ trainerId }, updates, {
      new: true,
    });

    if (!trainer) {
      return next(createHttpError(404, `Trainer with ID ${trainerId} not found.`));
    }

    res.status(200).json({
      message: "Trainer updated successfully.",
      success: true,
      trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error updating trainer.", error));
  }
};

module.exports = {
  createTrainer,
  getAllTrainers,
  updateTrainer,
};
