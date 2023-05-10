"use strict";

var accModel = require("../model/account");

var express = require("express");

var dbo = require("../db/conn");

var crypto = require("crypto");

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "otagomarketplace@gmail.com",
    pass: "thispasswordhasbeenstoredinsecurelyforconvenience"
  }
}); // This help convert the id from string to ObjectId for the _id.

var ObjectId = require("mongodb").ObjectId; //get a single account info


var getUser = function getUser(req, res) {
  var db_connect, myquery;
  return regeneratorRuntime.async(function getUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            db_connect = dbo.getDb();
            myquery = {
              _id: ObjectId(req.params.id)
            };
            db_connect.collection("user").findOne(myquery, function (err, result) {
              if (err) throw err;
              res.status(200).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; //get a single account info


var getUserByEmail = function getUserByEmail(req, res) {
  var db_connect, myquery;
  return regeneratorRuntime.async(function getUserByEmail$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            db_connect = dbo.getDb();
            myquery = {
              email: req.params.email
            };
            db_connect.collection("user").findOne(myquery, function (err, result) {
              if (err) throw err;
              res.status(200).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //get admin info


var getAdmin = function getAdmin(req, res) {
  var db_connect;
  return regeneratorRuntime.async(function getAdmin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          try {
            db_connect = dbo.getDb("test");
            db_connect.collection("admin").find({}).toArray(function (err, result) {
              if (err) throw err;
              res.status(200).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //delete user account, should only be called by an admin account


var deleteUser = function deleteUser(req, res) {
  var db_connection, myquery;
  return regeneratorRuntime.async(function deleteUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          try {
            db_connection = dbo.getDb();
            myquery = {
              email: ObjectId(req.params.email)
            };
            db_connection.collection("user").deleteOne(myquery, function (err, result) {
              if (err) throw err;
              console.log("One account deleted successfully");
              res.status(204).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //UPDATE an existing account


var updateUser = function updateUser(req, res) {
  var db_connection, myquery, hasher, userUpdate;
  return regeneratorRuntime.async(function updateUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {
            db_connection = dbo.getDb();
            myquery = {
              email: ObjectId(req.params.email)
            };
            hasher = crypto.createHash("sha256");
            hasher = hasher.update(req.body.password + "salt12345)(*&^");
            hashed_password = hasher.digest("hex");
            userUpdate = {
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              password: hashed_password,
              department: req.body.department,
              number: req.body.number,
              activationDate: req.body.activationDate //pfp: req.body.pfp,

            };
            db_connection.collection("user").updateOne(myquery, userUpdate, function (err, result) {
              if (err) throw err;
              console.log("one user info updated");
              res.status(200).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //create a new account


var createAccount = function createAccount(req, res) {
  var db_connect, hasher, account;
  return regeneratorRuntime.async(function createAccount$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          try {
            db_connect = dbo.getDb();
            hasher = crypto.createHash("sha256");
            hasher = hasher.update(req.body.password + "salt12345)(*&^");
            hashed_password = hasher.digest("hex");
            account = {
              name: req.body.name,
              surname: req.body.surname,
              email: req.body.email,
              password: hashed_password,
              department: req.body.department,
              number: req.body.number,
              activationDate: Math.floor(new Date().getTime() / 1000),
              images64: req.body.images64 //pfp: req.body.pfp,

            };
            console.log(account);
            db_connect.collection("user").insertOne(account, function (err, result) {
              if (err) throw err;
              res.json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var verifyLogin = function verifyLogin(req, res) {
  var db_connect, collection, result, hasher;
  return regeneratorRuntime.async(function verifyLogin$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log("req.body.email", req.body.email);
          console.log("req.body.password", req.body.password);
          _context7.prev = 2;
          db_connect = dbo.getDb();
          collection = db_connect.collection("user");
          _context7.next = 7;
          return regeneratorRuntime.awrap(collection.findOne({
            email: req.body.email
          }));

        case 7:
          result = _context7.sent;
          // check if the password matches
          console.log("result", result);

          if (result) {
            console.log("valid email");
            hasher = crypto.createHash("sha256");
            hasher = hasher.update(req.body.password + "salt12345)(*&^");
            password = hasher.digest("hex");

            if (result.password == password) {
              console.log("correct password, going back to client login");
              res.json(result);
            } else {
              console.log("wrong password for existing email");
              res.status(401).json({
                message: "Invalid username or password"
              });
            }
          } else {
            console.log("invalid email");
            res.status(401).json({
              message: "Invalid username or password"
            });
          }

          _context7.next = 16;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](2);
          console.error(_context7.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[2, 12]]);
};

var messageUser = function messageUser(req, res) {
  var db_connect, collection, result, mailOptions;
  return regeneratorRuntime.async(function messageUser$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          db_connect = dbo.getDb();
          collection = db_connect.collection("user");
          _context8.next = 5;
          return regeneratorRuntime.awrap(collection.findOne({
            email: req.body.email
          }));

        case 5:
          result = _context8.sent;

          if (result) {
            mailOptions = {
              from: "otagomarketplace@gmail.com",
              to: result.email,
              subject: req.body.subject,
              text: req.body.message
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          } else {
            res.status(500).json({
              message: "Internal server error"
            });
          }

          _context8.next = 13;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          console.error(_context8.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

module.exports = {
  getUser: getUser,
  getAdmin: getAdmin,
  createAccount: createAccount,
  updateUser: updateUser,
  deleteUser: deleteUser,
  messageUser: messageUser,
  verifyLogin: verifyLogin,
  getUserByEmail: getUserByEmail
};