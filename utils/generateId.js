


const Enquiry = require('../models/enquiry');  // Import your Enquiry model

// Function to generate the next unique enquiry ID
const generateUniqueID = async () => {
  try {
    // Find the last enquiry document and get the highest ID
    const lastEnquiry = await Enquiry.find().sort({ id: -1 }).limit(1);
    let newID = 'XCE001';

    if (lastEnquiry.length > 0) {
      const lastID = lastEnquiry[0].id;
      const idNumber = parseInt(lastID.replace('XCE', ''));
      newID = `XCE${(idNumber + 1).toString().padStart(3, '0')}`;
    }

    return newID;
  } catch (err) {
    throw new Error('Error generating new ID');
  }
};

module.exports = { generateUniqueID };
