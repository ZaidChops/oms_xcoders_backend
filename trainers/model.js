const { Schema, model } = require("mongoose");

const TrainerSchema = new Schema(
  {
    trainerId: {
      type: String,
      unique: true,
      default: "XCT",
    },
    trainerName: {
      type: String,
      required: [true, "Name is required."],
    },
    trainerContact: {
      type: String,
      required: [true, "Contact is required."],
    },
    trainerEmail: {
      type: String,
      required: [true, "Email is required."], 
      unique: true, 
    },
    trainerTechStack: {
      type: String,
      required: [
        true,
        "Tech Stack is required, like MERN, MEAN, JAVA Spring Boot, etc.",
      ],
    },
    trainerJoiningDate: {
      type: String,
    },
  },
  { timestamps: true }
);

const Trainer = model("Trainer", TrainerSchema);
module.exports = Trainer;
