const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // console.log("DB connection success:", conn.connection.host.blue);
    console.log("Database is connected Successfully.");
  } catch (error) {
    console.log("Error in DB connection".red);
  }
};

module.exports = connectDB ;
