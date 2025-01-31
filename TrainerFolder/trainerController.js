const Trainer = require("./trainerModel.js");
const { Counter } = require("../models/counterModel");
const createHttpError = require("http-errors");

const createTrainer = async (req, res, next) => {
  try {
    const {
      trainerName,
      trainerEmail,
      trainerTechStack,
      trainerContact,
      trainerJoiningDate,
    } = req.body;


    if (!trainerName || !trainerEmail || !trainerTechStack || !trainerContact || !trainerJoiningDate) {
      return res.status(400).json({
        message: "All fields, including Name, Email, Tech Stack, Contact, and Joining Date, are required.",
      });
    }

    const existingTrainer = await Trainer.findOne({ trainerEmail });
    if (existingTrainer) {
      return res.status(400).json({ message: "Trainer with this email already exists." });
    }

    const counter = await Counter.findOneAndUpdate(
      { name: "trainerId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const trainerId = `XCT${String(counter.seq).padStart(3, "0")}`;

   
    const trainer = new Trainer({
      trainerId,
      trainerName,
      trainerEmail,
      trainerTechStack,
      trainerContact,
      trainerJoiningDate,
    });

    await trainer.save();
    return res.status(201).json({
      message: "Trainer Created Successfully.",
      success: true,
      trainer: trainer,
    });

  } catch (error) {
    return next(createHttpError(500, "Error when creating new trainer.", error));
  }
};

const getAllTrainers = async (req, res, next) => {
  try {
    let {page,limit}=req.query

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 3;
    const skip = (page - 1) * limit;

    let query = {};

    const trainers=await Trainer.find(query).skip(skip).limit(limit);
    const totalTrainers=await Trainer.countDocuments(query)
    const trainer = await Trainer.find();

    res.status(200).json({
      success: true,
      trainer: trainer,
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
      return next(
        createHttpError(404, `Trainer with ID ${trainerId} not found.`)
      );
    }

    res.status(200).json({
      message: "Trainer updated successfully.",
      success: true,
      trainer: trainer,
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
  getAllTrainers,
  updateTrainer,
  deleteTrainer,
};
