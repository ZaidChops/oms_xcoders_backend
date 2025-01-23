const { config: conf } = require("dotenv");
conf();

const _config = {

  cloudinaryCloud: process.env.CLOUDINARY_CLOUD,
  cloudApiKey: process.env.CLOUDINARY_API_KEY,
  cloudnaryApiScrete: process.env.CLOUDINARY_API_SECRET,
};

// Freeze the configuration object to prevent modification
const config = Object.freeze(_config);

module.exports = config;
