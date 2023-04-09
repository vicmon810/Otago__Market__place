//const accModel = require("../model/account");
const express = require("express");
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//get a single account info
const getUser = async (req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("user").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.status(200).json(result);
  });
};

//get admin info
const getAdmin = async (req, res) => {
  let db_connect = dbo.getDb("test");
  db_connect
    .collection("admin")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.status(200).json(result);
    });
};

module.exports = {
  getUser,
  getAdmin,
};
