const express = require("express");
const {
  getAllItems,
  getSingleItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/itemController");
const routes = express.Router();

//GET All items
routes.get("/items", getAllItems);
//GET a Single items
routes.get("/item/:id", getSingleItem);
// POST a new item
routes.post("/items", createItem);
//DELETE a item
routes.delete("/item/:id", deleteItem);
// UPDATE a item
routes.patch("/item/:id", updateItem);

module.exports = routes;
