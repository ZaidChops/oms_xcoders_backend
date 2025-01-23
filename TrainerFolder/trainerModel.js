const { Schema, model } = require("mongoose");
// const Joi = require("joi");

const TrainerSchema = new Schema(
  {
    trainerId: {
      type: String,
      unique: true,
      default: "XCT",
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email must be unique."],
    },
    techStack: {
      type: String,
      required: [
        true,
        "Tech Stack is required, like MERN, MEAN, JAVA Spring boot etc.",
      ],
    },
  
    contact:{
type:String,
      required:true
    },

  },
  { timestamps: true }
);

const Trainer = model("Trainer", TrainerSchema);


module.exports = { Trainer };
