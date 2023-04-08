const itemModel = require("../model/item");
const express = require("express");
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//GET all items

const getAllItems = async (req, res) => {
  let db_connect = dbo.getDb("test");
  const items = await db_connect
    .collection("items")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
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
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  console.log(db_connect);
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
