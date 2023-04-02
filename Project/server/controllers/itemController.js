const itemModel = require("../model/items");

//GET all items
const getAllItems = async (req, res) => {
  const items = await itemModel.find({});
  res.status(200).json({ items });
};

// GET single item
const getSingleItem = async (req, res) => {
  const id = req.params.id;
  const item = await itemModel.findById(id);
  if (!item) {
    return res.status(404).json({ error: "Not Found" });
  }
  res.status(200).json(item);
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
