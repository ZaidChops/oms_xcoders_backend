const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinary");

// Configure CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "user_profiles", // Optionally, specify a folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional image transformations
  },
});

// Configure Cloud
// Configure Multer
const upload = multer({
  storage: storage,
  //  This option specifies where and how the uploaded files should be stored.

  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size: 10MB
});

module.exports = upload;
