const mongoose = require('mongoose');
const Enquiry = require('./enquiryModel');
const Counter = require("../models/counterModel");

const enquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      referral,
      yearOfPassing,
      sourceOfEnquiry,
      status,
      demo,
      followUp,
    } = req.body;

    const counter = await Counter.findOneAndUpdate(
      { name: "enquiryId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const enquiryId = `XCE${String(counter.seq).padStart(3, "0")}`;
    const enquiry = new Enquiry({
      enquiryId,
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      yearOfPassing,
      sourceOfEnquiry,
      referral,
      status,
      demo,
      followUp,
    });
    await enquiry.save();
    if (enquiry) {
      res.status(200).json({
        success: true,
        message: "Enquiry save successfully",
        enquiryData: enquiry,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "wrong",
    });
  }
};

const Editenquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      course,
      contactNo,
      courseFees,
      finalizeFees,
      academicQualifaction,
      yearOfPassing,
      sourceOfEnquiry,
      referral,
      status,
      demo,
      followUp,
    } = req.body;
    console.log(req.body);
    const enquiry = await Enquiry.findByIdAndUpdate(
      id,
      {
        name,
        email,
        course,
        contactNo,
        courseFees,
        finalizeFees,
        academicQualifaction,
        yearOfPassing,
        sourceOfEnquiry,
        referral,
        status,
        demo,
        followUp,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Enquiry updated successfully",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.find();
        res.status(200).json({
            success: true,
            enquiry
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error); // Log the actual error
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
  enquiry,
  Editenquiry,
  fetchEnquiry,
};
