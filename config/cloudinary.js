const cloudinary = require("cloudinary").v2;
const config=require('./config')

cloudinary.config({
  cloud_name: config.cloudinaryCloud,
  api_key: config.cloudApiKey,
  api_secret: config.cloudnaryApiScrete,
});

module.exports = { cloudinary };
