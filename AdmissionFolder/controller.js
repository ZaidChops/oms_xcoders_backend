const createHttpError = require("http-errors");

// const cloudinary = require("../config/cloudinary.js").v2;
const Admission = require("./model.js");
const { Counter } = require("../models/counterModel.js");
const { pagination } = require("../utils/pagination.js");

const createAdmission = async (req, res, next) => {
  try {
    const {
      name,
      fatherName,
      motherName,
      academics,
      dateOfBirth,
      email,
      contact,
      marks,
      course,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      refrence,
    } = req.body;

    console.log(req.body);

    // Validate required fields
    if (
      !name ||
      !fatherName ||
      !motherName ||
      !academics ||
      !dateOfBirth ||
      !email ||
      !contact ||
      !marks ||
      !course ||
      !temporaryAddress ||
      !permanentAddress
    ) {
      return next(createHttpError(400, "All required fields must be filled."));
    }

    console.log("Checking existing admission...");
    const existingAdmission = await Admission.findOne({ email });

    if (existingAdmission) {
      return next(createHttpError(400, "This student is already registered."));
    }

    // Generate Admission ID
    const counter = await Counter.findOneAndUpdate(
      { name: "admissionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const admissionId = `XCA${String(counter.seq).padStart(3, "0")}`;

    const newAdmission = new Admission({
      admissionId,
      name,
      fatherName,
      motherName,
      academics,
      dateOfBirth,
      email,
      contact,
      marks,
      course,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      refrence,
    });

    await newAdmission.save();
    console.log("created successfully");
    res.status(201).json({
      message: "Admission created successfully.",
      success: true,
      admission: newAdmission,
    });
  } catch (error) {
    next(createHttpError(500, "Server Error while creating admission."));
  }
};

const allAdmissions = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const admissionData = await pagination(Admission, page, limit);
    return res
      .status(200)
      .json({ success: true, admissionData: admissionData });
  } catch (error) {
    next(createHttpError(500, "Server Error while fetching admissions."));
  }
};

const editAdmission = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // console.log("Admission ID:", admissionId);
    console.log("Updated Data:", updatedData);

    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path, {
    //     folder: "admissions",
    //   });

    //   // updatedData.uploadPhoto = result.secure_url;
    // }

    const admission = await Admission.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!admission) {
      return next(createHttpError(404, "Admission not found"));
    }

    res.status(200).json({
      success: true,
      message: "Admission updated successfully",
      admission,
    });
  } catch (err) {
    console.error("Error in editAdmission:", err);
    next(createHttpError(500, "Server Error while updating admission"));
  }
};

module.exports = { createAdmission, allAdmissions, editAdmission };
