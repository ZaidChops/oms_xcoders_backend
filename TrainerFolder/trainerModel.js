const { Schema, model } = require("mongoose");

const TrainerSchema = new Schema(
  {
    trainerId: {
      type: String,
      default: "XCT",
    },
    trainerName: {
      type: String,
      required: [true, "Name is required."],
    },
    trainerEmail: {
      type: String,
      required: [true, "Email is required."], // Ensure it's required
      unique: true, // Keep unique
    },
    trainerTechStack: {
      type: String,
      required: [
        true,
        "Tech Stack is required, like MERN, MEAN, JAVA Spring Boot, etc.",
      ],
    },
    trainerContact: {
      type: String,
      required: true,
    },
    trainerJoiningDate: {
      type: Date,
      required: [true, "Joining Date is required"],
    },
  },
  { timestamps: true }
);

const Trainer = model("Trainer", TrainerSchema);

module.exports = Trainer;
