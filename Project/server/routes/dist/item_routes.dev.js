"use strict";

var express = require("express");

var _require = require("../controllers/itemController"),
    getAllItems = _require.getAllItems,
    getSingleItem = _require.getSingleItem,
    createItem = _require.createItem,
    deleteItem = _require.deleteItem,
    updateItem = _require.updateItem,
    searchItem = _require.searchItem;

var routes = express.Router(); //GET All items

routes.get("/items", getAllItems); //GET a Single items

routes.get("/item/:id", getSingleItem); // POST a new item

routes.post("/items", createItem); //DELETE a item

routes["delete"]("/item/:id", deleteItem); // UPDATE a item

routes.patch("/item/:id", updateItem); //Search items

routes.get("/items/:searchInput", searchItem);
module.exports = routes;