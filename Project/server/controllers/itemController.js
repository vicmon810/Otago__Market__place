const itemModel = require("../model/item");
const express = require("express");
const dbo = require("../db/conn");
const { ObjectID } = require("mongodb");

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
  let db_connect = dbo.getDb();
  let item = {};
  db_connect.collection("items").insertOne(item, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
};

// update a single item
const updateItem = async (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newItem = {
    $set: {},
  };
  db_connect
    .collection("items")
    .updateOne(myquery, newItem, function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
};

//delete a item
const deleteItem = async (req, res) => {
  let db_connection = dbo.getDb();
  let myquery = { _id: ObjectID(req.params.id) };
  db_connection.collection("items").deleteOne(myquery, function (err, result) {
    if (err) throw err;
    console.log("1 item deleted successfully");
    res.status(204).json(result);
  });
};

//Exports function
module.exports = {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
};
