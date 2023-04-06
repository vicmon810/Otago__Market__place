const express = require("express");
const {
  getAllItems,
  getSingleItem,
  createItem,
} = require("../controllers/itemController");
const routes = express.Router();

//GET All items
routes.get("/items", getAllItems);
//GET a Single items
routes.get("/item/:id", getSingleItem);
// POST a new item
routes.post("/items", createItem);

//DELETE a item
routes.delete("/item/:id", (req, res) => {
  res.json({ mssg: "DELETE new item" });
});
// UPDATE a item
routes.patch("/item/:id", (req, res) => {
  res.json({ mssg: "UPDATE new item" });
});

module.exports = routes;
