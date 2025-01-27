const Enquiry = require("../EnquiryFolder/enquiryModel.js");

const pagination = async (Model, page = 1, limit = 5) => {
  try {
    page < 1 ? 1 : page;

    const total = await Model.countDocuments();
    let pages = Math.ceil(total / limit);

    const items = await Model.find()
      .skip((page - 1) * limit)
      .limit(limit);

    return {
      total,
      items,
      page,
      limit,
      pages,
      items,
    };
  } catch (error) {
    console.log(error);
  }
};

const getPage = async (req, res) => {
  let { page = 5, limit = 5 } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const data = await pagination(Enquiry, pageNumber, limitNumber);
    res.json(data);

  } catch(error) {
    console.log(error);
  }
};

module.exports = { getPage };
