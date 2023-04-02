const express = require("express");
const itemModel = require("../model/items");
const routes = express.Router();

//GET All items
routes.get("/", (req, res) => {
  res.json({ mssg: "Get all messages" });
});
//GET a Single items
routes.get("/:id", (req, res) => {
  res.json({ mssg: "single" });
});
// POST a new item
routes.post("/", async (req, res) => {
  const { Product } = req.body;
  try {
    const item = await itemModel.create({ product });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//DELETE a item
routes.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE new item" });
});
// UPDATE a item
routes.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE new item" });
});

module.exports = routes;
