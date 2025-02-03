const { Schema, model } = require("mongoose");

const AdmissionSchema = new Schema(
  {
    admissionId: {
      type: String,
      unique: true,
      default: "XCA",
    },
    name: {
      type: String,
      required: [true, "Student Name is required."],
    },
    fatherName: {
      type: String,
      required: [true, "Father Name is required."],
    },
    motherName: {
      type: String,
      required: [true, "Mother Name is required."],
    },

    academics: {
      type: String,
      required: [true, "Academics are required."],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of Birth is requiered."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    contact: {
      type: String,
      required: [true, "Phone number is required."],
    },
    marks: {
      type: Number,
      required: [true, "Marks are required."],
    },
    temporaryAddress: {
      type: String,
      required: [true, "Address is required."],
    },
    permanentAddress: {
      type: String,
      required: [true, "Address is required."],
    },

    sourceOfAdmission: {
      type: String,
    },

    refrence: {
      type: String,
    },
  course: {
      type: String,
    },
    // uploadPhoto: {
    //   type: String,
    // },
  },

  { timestamps: true }
);

module.exports = model("Admission", AdmissionSchema);
