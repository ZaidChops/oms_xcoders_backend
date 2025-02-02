const Enquiry = require("../EnquiryFolder/enquiryModel.js");
const { Trainer } = require("../trainers/model.js");
const Admission = require("../AdmissionFolder/admissionModel.js");
const { Counter } = require("../models/counterModel.js");
const createHttpError = require("http-errors");


const getDashboardStats = async (req, res, next) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);


    const totalEnquiries = await Counter.findOne({ name: "enquiryId" });
    const totalEnquiriesCount = totalEnquiries.seq;



    const todayEnquiries = await Enquiry.countDocuments({
      createdAt: { $gte: todayStart },
    });


    const data = await Trainer.find({});

    const totalTrainers = await Counter.findOne({ name: "trainerId" });
    const totalTrainersCount = totalTrainers.seq;


    const totalAdmissions = await Counter.findOne({ name: "admissionId" });
    const totalAdmissionsCount = totalAdmissions.seq;



    const todayAdmissions = await Admission.countDocuments({
      createdAt: { $gte: todayStart },
    });


    const demoSessions = await Enquiry.countDocuments({ demo: "true" });

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiriesCount,
        todayEnquiries,
        totalTrainersCount,
        totalAdmissionsCount,
        todayAdmissions,
        demoSessions,
      },
    });
  } catch (error) {
    next(createHttpError(400, "Failed to fetch dashboard stats"));
  }
};

module.exports = { getDashboardStats };