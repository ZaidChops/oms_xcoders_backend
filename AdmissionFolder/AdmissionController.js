const createHttpError = require("http-errors");

const cloudinary = require("../config/cloudinary.js").v2;
const Admission = require("./admissionModel.js");
const { Counter } = require("../models/counterModel.js");

const createAdmission = async (req, res, next) => {
  try {
    const {
      name,
      fatherName,
      motherName,
      academics,
      DOB,
      email,
      contact,
      course,
      marks,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      refrence,
    } = req.body;

    if (
      !name ||
      !fatherName ||
      !motherName ||
      !academics ||
      !DOB ||
      !email ||
      !contact ||
      !marks ||
      !temporaryAddress ||
      !permanentAddress
    ) {
      return next(createHttpError(400, "All required fields must be filled."));
    }

    // console.log("first")
    const existingAdmission = await Admission.findOne({ email });
    if (existingAdmission) {
      return next(createHttpError(400, "This student is already registered."));
    }
    // console.log("2")

    if (!req.file) {
      return next(createHttpError(400, "Upload photo is required."));
    }
    // console.log("3")

    const counter = await Counter.findOneAndUpdate(
      { name: "admissionId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    // console.log("4")

    const admissionId = `XCA${String(counter.seq).padStart(3, "0")}`;
    // console.log("5")

    const uploadPhotoUrl = req.file ? req.file.path : null;
    // console.log("5")

    const newAdmission = new Admission({
      admissionId,
      name,
      fatherName,
      motherName,
      academics,
      DOB,
      email,
      contact,
      marks,
      course,
      temporaryAddress,
      permanentAddress,
      sourceOfAdmission,
      refrence,
      uploadPhoto: uploadPhotoUrl,
    });
    // console.log("6")

    await newAdmission.save();
    // console.log("7")

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
  
    const admissions = await Admission.find(); // Fetch all admissions
    const formattedAdmissions = admissions.map(admission => {
      // Format DOB to a human-readable string
      admission.DOB = admission.DOB.toLocaleDateString();
      return admission;
    });
    res.json({ success: true, admissions: formattedAdmissions });
  }
  catch (error) {
    next(createHttpError(500, "Server Error while fetching admissions."))
  }


}

const editAdmission = async (req, res, next) => {
  try {
    const { id: admissionId } = req.params;
    let updatedData = req.body;

    console.log("Admission ID:", admissionId);
    console.log("Updated Data:", updatedData);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "admissions",
      });


      updatedData.uploadPhoto = result.secure_url;
    }


    const admission = await Admission.findOneAndUpdate(
      { admissionId },
      updatedData,
      { new: true }
    );

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
