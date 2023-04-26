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
  try {
    let db_connect = dbo.getDb();
    let item = {
      Product_id: req.body.Product_id,
      Product_name: req.body.Title,
      Quantity: req.body.Quantity,
      Location: req.body.Location,
      Product_description: req.body.Description,
      Product_category: req.body.Category,
      Create_time: req.body.Timestamp,
      Owner_account: req.body.Owner_account,
      Owner_contact: {
        Email: req.body.Email,
        Phone: req.body.Phone,
      },
      Image: req.body.Image,
      Product_Features: req.body.Product_Features,
      Tags: req.body.Tags,
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
        Product_id: req.params.Product_id,
        Product_name: req.body.Product_name,
        Quantity: req.body.Quantity,
        Location: req.body.Location,
        Product_description: req.body.Product_description,
        Product_category: req.body.Product_category,
        Create_time: req.body.Create_time,
        Owner_account: req.body.Owner_account,
        Owner_contact: {
          Email: req.body.Email,
          Phone: req.body.Phone,
        },
        Image: req.body.Image,
        Product_Features: req.body.Product_Features,
        Tags: req.body.Tags,
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
