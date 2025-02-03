const Enquiry = require("./enquiryModel");
const {Counter} = require("../models/counterModel");
const { pagination } = require("../utils/pagination");

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

const editEnquiry = async (req, res) => {
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
    console.error("Error updating enquiry:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchEnquiry = async (req, res) => {
  try {
    // const enquiry = await Enquiry.find();
    // res.status(200).json({
    //     success: true, 
    //     enquiry
    // });
    const { page, limit } = req.query;
    const enquiryData = await pagination(Enquiry, page, limit);
    
    return res.status(200).json({ success: true, enquiryData: enquiryData });
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
  editEnquiry,
  fetchEnquiry,
};
