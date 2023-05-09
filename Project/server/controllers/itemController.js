const itemModel = require("../model/item");
const express = require("express");
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

function getTime() {
  UNIX_timestamp = Math.floor(new Date().getTime() / 1000);
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + " " + month + " " + year;
  // var hour = a.getHours();
  // var min = a.getMinutes();
  // var sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

//GET all items
const getAllItems = async (req, res) => {
  try {
    let db_connect = dbo.getDb("test");
    const items = await db_connect
      .collection("items")
      .find()
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
      // product_id: req.body.product_id,
      title: req.body.title,
      category: req.body.category,
      quantity: req.body.quantity,
      location: req.body.location,
      description: req.body.description,
      images64: req.body.images64,
      listingDate: getTime(),
      userAccount: req.body.userAccount,
      contactInfo: {
        email: req.body.email,
        number: req.body.number,
      },
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
      // product_id: req.body.product_id,
      title: req.body.title,
      category: req.body.category,
      quantity: req.body.quantity,
      location: req.body.location,
      description: req.body.description,
      images64: req.body.images64,
      listingDate: req.body.listingDate,
      userAccount: req.body.userAccount,
      contactInfo: {
        email: req.body.email,
        number: req.body.number,
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

//delete an item
const deleteItem = async (req, res) => {
  try {
    let db_connection = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
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

//Search items
const searchItem = async (req, res) => {
  try {
    const db_connection = dbo.getDb();
    const query = { title: { $regex: req.params.searchInput, $options: "i" } };
    console.log(query);
    const items = await db_connection.collection("items").find(query).toArray();

    if (items.length === 0) {
      return res.status(404).json({
        message: "No items found",
      });
    }
    console.log(items);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
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
  searchItem,
};
