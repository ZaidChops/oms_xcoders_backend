
const pagination = async (Model, page = 1, limit = 1) => {
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
    };
  } catch (error) {
    console.log(error);
  }
};


module.exports = { pagination };
