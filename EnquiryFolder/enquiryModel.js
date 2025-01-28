const { Schema, model } = require("mongoose");
const EnquirySchema = new Schema({
  enquiryId: {
    type: String,
    unique: true,
    default: "XCE",
  },
  courseName: {
    type: String,
    required: [true, "mention the course you wish to join"],
  },
  courseCategory: {
    type: String,
    required: [true, "Course Category is required"],
  },
  courseDuration: {
    type: String,
    require: [true, "Course Duration required"],
  },
  courseFee: {
    type: Number,
    require: [true, "Course fee required"],
  },

  finalizeFees: {
    type: Number,
  },

  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  contact: {
    type: String,
    required: [true, "Mobile Number is required."],
  },
  academicQualification: {
    type: String,
    required: [true, "Academic Qualification is required."],
  },
  yearOfPassing: {
    type: String,
  },
  sourceOfEnquiry: {
    type: String,
  },
  referralBy: {
    type: String,
  },
  counselorName: {
    type: String,
  },
  status: {
    type: String,
    default: "Interested",
  },
  demo: {
    type: String,
    default: "no",
  },
  followUp: {
    type: String,
  },
});

module.exports = model("Enquiry", EnquirySchema);
