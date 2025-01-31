const mongoose = require("mongoose");
const Enquiry = require("./enquiryModel");
const Counter = require("../models/counterModel");

const enquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      courseName,
      courseCategory,
      courseDuration,
      courseFee,
      contact,
      finalizeFees,
      academicQualification,
      referralBy,
      yearOfPassing,
      sourceOfEnquiry,
      counselorName,
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
      courseName,
      courseCategory,
      courseDuration,
      courseFee,
      contact,
      finalizeFees,
      academicQualification,
      referralBy,
      yearOfPassing,
      sourceOfEnquiry,
      counselorName,
      status,
      demo,
      followUp,
    });
    await enquiry.save();
    if (enquiry) {
      res.status(200).json({
        success: true,
        message: "Enquiry saved successfully",
        enquiryData: enquiry,
      });
    }
  } catch (error) {
    console.error("Error saving enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while saving the enquiry.",
    });
  }
};

const Editenquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      courseName,
      courseCategory,
      courseDuration,
      courseFee,
      contact,
      finalizeFees,
      academicQualification,
      referralBy,
      counselorName,
      yearOfPassing,
      sourceOfEnquiry,
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
        courseName,
        courseCategory,
        courseFee,
        courseDuration,
        contact,
        finalizeFees,
        academicQualification,
        referralBy,
        counselorName,
        yearOfPassing,
        sourceOfEnquiry,
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
    console.error("Error updating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchEnquiry = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 3;
    const skip = (page - 1) * limit;

    let query = {};

    const enquiries = await Enquiry.find(query).skip(skip).limit(limit);
    const totalEnquiries = await Enquiry.countDocuments(query);

    res.status(200).json({
      success: true,
      data: enquiries,
      page,
      limit,
      totalPages: Math.ceil(totalEnquiries / limit),
      totalEnquiries,
    });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  enquiry,
  Editenquiry,
  fetchEnquiry,
};
