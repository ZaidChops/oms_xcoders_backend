const { Counter } =require("../models/counterModel");

const initializeCounter = async () => {
  const courseCounter = await Counter.findOne({ name: "courseId" });
  if (!courseCounter) {
    await Counter.create({ name: "courseId", seq: 0 });
  }

    const enquiryCounter = await Counter.findOne({ name: "enquiryId" });
    if (!enquiryCounter) {
      await Counter.create({ name: "enquiryId", seq: 0 });
    }
  const trainerCounter = await Counter.findOne({ name: "trainerId" });
  if (!trainerCounter) {
    await Counter.create({ name: "trainerId", seq: 0 });
  };
  
   const admissionCounter = await Counter.findOne({ name: "admissionId" });
   if (!admissionCounter) {
     await Counter.create({ name: "admissionId", seq: 0 });
   }
};

initializeCounter();


// const { Counter } = require("../models/counterModel");
// const mongoose = require("mongoose");

// const initializeCounter = async () => {
//   try {
//     // List all collections in the database
//     const collections = await mongoose.connection.db.listCollections().toArray();

//     const resetCounter = async (name) => {
//       const collectionExists = collections.some((col) => col.name === `${name.toLowerCase()}s`);
      
//       if (!collectionExists) {
//         console.log(`${name} collection dropped. Resetting counter...`);
//         await Counter.deleteMany({ name: `${name}Id` });
//       }
      
//       const counter = await Counter.findOne({ name: `${name}Id` });
//       if (!counter) {
//         console.log(`Creating new counter for ${name}`);
//         await Counter.create({ name: `${name}Id`, seq: 0 });
//       }
//     };

//     // Reset and initialize counters for all required entities
//     await resetCounter("course");
//     await resetCounter("enquiry");
//     await resetCounter("trainer");
//     await resetCounter("admission");

//     console.log("Counters initialized successfully.");
//   } catch (error) {
//     console.error("Error initializing counters:", error.message);
//   }
// };

// initializeCounter();
