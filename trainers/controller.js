const Trainer  = require("./model.js");
const { Counter } = require("../models/counterModel.js");
const { pagination} = require("../utils/pagination.js")
const createHttpError = require("http-errors");

const createTrainer = async (req, res, next) => {
  try {
    const {
      trainerName,
      trainerContact,
      trainerEmail,
      trainerTechStack,
      trainerJoiningDate,
    } = req.body;

    // Validations
    if (
      !trainerName ||
      !trainerContact ||
      !trainerEmail ||
      !trainerTechStack ||
      !trainerJoiningDate
    ) {
      return res.status(400).json({
        message:
          "trainerName, trainerContact, trainerEmail, trainerTechStack, trainerJoiningDate are required",
      });
    }

    const existingTrainer = await Trainer.findOne({ trainerEmail });
    if (existingTrainer) {
      return next(createHttpError(400, "This trainer is already registered."));
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "trainerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const trainerId = `XCT${String(counter.seq).padStart(3, "0")}`;
console.log(trainerId)
    // Create the new trainer
    const trainer = new Trainer({
      trainerId,
      trainerName,
      trainerContact,
      trainerEmail,
      trainerTechStack,  
      trainerJoiningDate,
    });
    await trainer.save();

    return res.status(201).json({
      message: "Trainer Created Successfully.",
      success: true,
      trainerData: trainer,
    });
  } catch (error) {
    return next(
      createHttpError(500, "Error when creating new trainer.", error)
    );
  }
};

const fetchTrainers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const trainersData = await pagination(Trainer, page, limit);

    res.status(200).json({
      success: true,
      trainersData: trainersData,
    });
  } catch (error) {
    next(createHttpError(500, "Error fetching trainers.", error));
  }
};

const editTrainer = async (req, res, next) => {
  const { trainerId } = req.params;
  const updates = req.body;

  try {
    const trainer = await Trainer.findOneAndUpdate({ trainerId }, updates, {
      new: true,
    });

    if (!trainer) {
      return next(
        createHttpError(404, `Trainer with ID ${trainerId} not found.`)
      );
    }

    res.status(200).json({
      message: "Trainer updated successfully.",
      success: true,
      trainer : trainer,
    });
  } catch (error) {
    next(createHttpError(500, "Error updating trainer.", error));
  }
};


const deleteTrainer = async (req, res, next) => {
  try {
    const { trainerId } = req.params;
    const trainer = await Trainer.findOneAndDelete({ trainerId });
    if (!trainer) {
      return res
        .status(404)
        .json({ success: false, message: "Trainer Id not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Trainer deleted successfully.",
      trainer: trainer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  createTrainer,
  fetchTrainers,
  editTrainer,
  deleteTrainer
};
