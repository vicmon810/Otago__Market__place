//const accModel = require("../model/account");
const express = require("express");
const dbo = require("../db/conn");
const crypto = require('crypto');
const { ObjectID } = require("mongodb");
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'otagomarketplace@gmail.com',
    pass: 'thispasswordhasbeenstoredinsecurelyforconvenience'
  }
});



// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//get a single account info
const getUser = async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
    };
    db_connect.collection("user").findOne(myquery, function (err, result) {
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

//get admin info
const getAdmin = async (req, res) => {
  try {
    let db_connect = dbo.getDb("test");
    db_connect
      .collection("admin")
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

//delete user account, should only be called by an admin account
const deleteUser = async (req, res) => {
  try {
    let db_connection = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
    };
    db_connection.collection("user").deleteOne(myquery, function (err, result) {
      if (err) throw err;
      console.log("One account deleted successfully");
      res.status(204).json(result);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//UPDATE an existing account
const updateUser = async (req, res) => {
  try {
    let db_connection = dbo.getDb();
    let myquery = {
      _id: ObjectId(req.params.id),
    };
    let hasher = crypto.createHash('sha256');
    hasher = hasher.update(req.body.password + "salt12345)(*&^");
    password = hasher.digest('hex');

    let userUpdate = {
      $set: {
        User_id: req.body.User_id,
        User_Name: req.body.User_Name,
        password: password,
        Email: req.body.Email,
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
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//create a new account
const createAccount = async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let hasher = crypto.createHash('sha256');
    hasher = hasher.update(req.body.password + "salt12345)(*&^");
    password = hasher.digest('hex');
    let account = {
      User_id: req.body.User_id,
      User_name: req.body.User_Name,
      password: password,
      Email: req.body.Email,
      Department: req.body.Department,
      Contact_Number: req.body.Contact_Number,
      Profile_Picture: req.body.Profile_Picture,
    };
    console.log(account);
    db_connect.collection("user").insertOne(account, function (err, result) {
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

const verifyLogin = async (req, res) => {
  try {
    const db_connect = dbo.getDb();
    const collection = db_connect.collection("user");
    const result = await collection.findOne({
      Email: req.body.email,
    });

    //console.log(req.body.email);
    //console.log(result);
    // check if the password matches
    if (result) {
      let hasher = crypto.createHash('sha256');
      hasher = hasher.update(req.body.password + "salt12345)(*&^");
      password = hasher.digest('hex');
      if (result.password == password) {
        res.status(200).json(result);
      }
      res.status(401).json({
        message: "Invalid username or password",
      });
    } else {
      res.status(401).json({
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const messageUser = async (req, res) => {


  try {
    const db_connect = dbo.getDb();
    const collection = db_connect.collection("user");
    const result = await collection.findOne({
      User_Name: req.body.username,
    });
    if (result) {
      var mailOptions = {
        from: 'otagomarketplace@gmail.com',
        to: result.Email,
        subject:  req.body.subject,
        text: req.body.message
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getUser,
  getAdmin,
  createAccount,
  updateUser,
  deleteUser,
  messageUser,
  verifyLogin
};
