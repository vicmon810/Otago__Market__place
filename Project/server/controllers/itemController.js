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

const getSingleItem = async (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("items").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
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
