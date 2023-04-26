const itemModel = require("../model/item");
const express = require("express");
const dbo = require("../db/conn");
const { ObjectID } = require("mongodb");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
//GET all items

const getAllItems = async (req, res) => {
  try {
    let db_connect = dbo.getDb("test");
    const items = await db_connect
      .collection("items")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getSingleItem = async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
    };
    db_connect.collection("items").findOne(myquery, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//create a new item
const createItem = async (req, res) => {
  console.log(req.body);
  try {
    let db_connect = dbo.getDb();
    let item = {
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      quantity: req.body.quantity,
      description: req.body.description,
      images: req.body.images,
      listingDate: req.body.listingDate,
      owner: req.body.owner,
    };
    console.log(item);
    db_connect.collection("items").insertOne(item, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// update a single item
const updateItem = async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
    };
    let newItem = {
      $set: {
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        quantity: req.body.quantity,
        description: req.body.description,
        images: req.body.images,
        listingDate: req.body.listingDate,
        owner: req.body.owner,
      },
    };
    console.log(newItem);
    db_connect
      .collection("items")
      .updateOne(myquery, newItem, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//delete a item
const deleteItem = async (req, res) => {
  try {
    let db_connection = dbo.getDb();
    let myquery = {
      _id: ObjectID(req.params.id),
    };
    db_connection
      .collection("items")
      .deleteOne(myquery, function (err, result) {
        if (err) throw err;
        console.log("1 item deleted successfully");
        res.status(204).json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//Exports function
module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
};
