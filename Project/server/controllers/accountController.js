const accModel = require("../model/account");
const express = require("express");
const dbo = require("../db/conn");
const crypto = require("crypto");
var nodemailer = require("nodemailer");
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: 'AKIA43B5T2Z2NCESRRBE',
  secretAccessKey: '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',
  region: 'ap-southeast-2'
});
 
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
 
//get a single account info
const getUserByEmail = async (req, res) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = {
      email: req.params.email,
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
      email: ObjectId(req.params.email),
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
      email: ObjectId(req.params.email),
    };
    let hasher = crypto.createHash("sha256");
    hasher = hasher.update(req.body.password + "salt12345)(*&^");
    hashed_password = hasher.digest("hex");
 
    let userUpdate = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashed_password,
      department: req.body.department,
      number: req.body.number,
      activationDate: getTime(),
      //pfp: req.body.pfp,
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
    const ses = new AWS.SES();
    let db_connect = dbo.getDb();
    let hasher = crypto.createHash("sha256");
    hasher = hasher.update(req.body.password + "salt12345)(*&^");
    hashed_password = hasher.digest("hex");
    let account = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashed_password,
      department: req.body.department,
      number: req.body.number,
      activationDate: getTime(),
      images64: req.body.images64,
      //pfp: req.body.pfp,
    };
    console.log(account);
    const params = {
      EmailAddress: req.body.email // Replace with the email address you want to verify
    };
    
    // Call SES to verify the email identity
    ses.verifyEmailIdentity(params, function(err, data) {
      if (err) {
        console.log(err, err.stack); // An error occurred
      } else {
        console.log(data); // Successful response
      }
    });
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
  console.log("req.body.email", req.body.email);
  console.log("req.body.password", req.body.password);
  try {
    const db_connect = dbo.getDb();
    const collection = db_connect.collection("user");
    const result = await collection.findOne({
      email: req.body.email,
    });
 
    // check if the password matches
    console.log("result", result);
    if (result) {
      console.log("valid email");
      let hasher = crypto.createHash("sha256");
      hasher = hasher.update(req.body.password + "salt12345)(*&^");
      password = hasher.digest("hex");
      if (result.password == password) {
        console.log("correct password, going back to client login");
        res.json(result);
      } else {
        console.log("wrong password for existing email");
        res.status(401).json({
          message: "Invalid username or password",
        });
      }
    } else {
      console.log("invalid email");
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
      name: req.body.username,
    });
    console.log(result);
    if (result) {
      const ses = new AWS.SES();
      const params = {
        Destination: {

          ToAddresses: [result.email]
        },
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: 'Your new message from Otago Marketplace regarding item ' + req.body.item + ":<br/><br/>" + req.body.message
            },
            Text: {
              Charset: 'UTF-8',
              Data: req.body.message
            }
          },
          Subject: {
            Charset: 'UTF-8',
            Data: "New message on Otago Marketplace for " + req.body.item
          }
        },
        Source: 'otagomarketplace@gmail.com'
      };
      
      ses.sendEmail(params, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log('Email sent:', data);
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
  verifyLogin,
  getUserByEmail,
};
