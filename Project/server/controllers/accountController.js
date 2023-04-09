//const accModel = require("../model/account");
const express = require("express");
const dbo = require("../db/conn");
const { ObjectID } = require("mongodb");

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

//delete user account, should only be called by an admin account
const deleteUser = async (req, res) => {
  let db_connection = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connection.collection("user").deleteOne(myquery, function (err, result) {
    if (err) throw err;
    console.log("One account deleted successfully");
    res.status(204).json(result);
  });
};

//UPDATE an existing account
const updateUser = async (req, res) => {
  let db_connection = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let userUpdate = {
    $set: {
      User_id: req.body.User_id,
      User_name: req.body.User_name,
      password: req.body.password,
      Email: req.body.email,
      Department: req.body.Department,
      Contact_Number: req.body.Contact_Number,
      Profile_Picture: req.body.Profile_Picture,
    },
  };
  db_connection
    .collection("user")
    .updateOne(myquery, userUpdate, function (err, result) {
      if (err) throw err;
      console.log("one user info updated");
      res.status(200).json(result);
    });
};

//create a new account
const createAccount = async (req, res) => {
  let db_connect = dbo.getDb();
  let account = {
    User_id: req.body.User_id,
    User_name: req.body.User_name,
    password: req.body.password,
    Email: req.body.email,
    Department: req.body.Department,
    Contact_Number: req.body.Contact_Number,
    Profile_Picture: req.body.Profile_Picture,
  };
  console.log(account);
  db_connect.collection("user").insertOne(account, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
};

module.exports = {
  getUser,
  getAdmin,
  createAccount,
  updateUser,
  deleteUser,
};
