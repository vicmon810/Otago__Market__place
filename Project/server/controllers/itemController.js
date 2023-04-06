const itemModel = require("../model/items");

//GET all items
const getAllItems = async (req, res) => {
  console.log("TEST");
  // const count = await Item.estimatedDocumentCount({}, { maxTimeMS: 30000 });
  const items = await itemModel.find({});
  res.status(200).json({ items });
};

// GET single item
// const getSingleItem = async (req, res) => {
//   const id = req.params.id;
//   const item = await itemModel
//     .findById(id)
//     .maxTimeMS(30000)
//     .exec(function (err, item) {
//       console.log(item);
//     });
//   if (!item) {
//     return res.status(404).json({ error: "Not Found" });
//   }
//   res.status(200).json(item);
// };

const getSingleItem = async (req, res) => {
  const id = req.params.id;
  try {
    const item = await itemModel
      .findById(id)
      .maxTimeMS(60000) // Increase the timeout value to 60 seconds
      .exec();
    if (!item) {
      return res.status(404).json({ error: "Not Found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

//create a new item
const createItem = async (req, res) => {
  const { Product } = req.body;
  try {
    const item = await itemModel.create({ product });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a single item

//Exports function
module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
};
