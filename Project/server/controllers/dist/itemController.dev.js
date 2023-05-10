"use strict";

var itemModel = require("../model/item");

var express = require("express");

var dbo = require("../db/conn"); // This help convert the id from string to ObjectId for the _id.


var ObjectId = require("mongodb").ObjectId;

function getTime() {
  UNIX_timestamp = Math.floor(new Date().getTime() / 1000);
  var a = new Date(UNIX_timestamp * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + " " + month + " " + year; // var hour = a.getHours();
  // var min = a.getMinutes();
  // var sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

  return time;
} //GET all items


var getAllItems = function getAllItems(req, res) {
  var db_connect, items;
  return regeneratorRuntime.async(function getAllItems$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          db_connect = dbo.getDb("test");
          _context.next = 4;
          return regeneratorRuntime.awrap(db_connect.collection("items").find().toArray(function (err, result) {
            if (err) throw err;
            res.status(200).json(result);
          }));

        case 4:
          items = _context.sent;
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getSingleItem = function getSingleItem(req, res) {
  var db_connect, myquery;
  return regeneratorRuntime.async(function getSingleItem$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          try {
            db_connect = dbo.getDb();
            myquery = {
              _id: ObjectId(req.params.id)
            };
            db_connect.collection("items").findOne(myquery, function (err, result) {
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
}; //create a new item


var createItem = function createItem(req, res) {
  var db_connect, item;
  return regeneratorRuntime.async(function createItem$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(req.body);

          try {
            db_connect = dbo.getDb();
            item = {
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
                number: req.body.number
              }
            };
            console.log(item);
            db_connect.collection("items").insertOne(item, function (err, result) {
              if (err) throw err;
              res.json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // update a single item


var updateItem = function updateItem(req, res) {
  var db_connect, myquery, _updateItem;

  return regeneratorRuntime.async(function updateItem$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log("test");

          try {
            db_connect = dbo.getDb();
            myquery = {
              _id: ObjectId(req.params.id)
            };
            _updateItem = {
              $set: {
                title: req.body.title,
                category: req.body.category,
                quantity: req.body.quantity,
                location: req.body.location,
                description: req.body.description,
                images64: req.body.images64,
                listingDate: req.body.listingDate,
                userAccount: req.body.userAccount,
                "contactInfo.email": req.body.email,
                "contactInfo.number": req.body.number
              }
            };
            console.log(_updateItem);
            db_connect.collection("items").updateOne(myquery, _updateItem, function (err, result) {
              if (err) throw err;
              res.status(200).json(result);
            });
          } catch (err) {
            console.error(err);
            res.status(500).json({
              message: "Internal server error"
            });
          }

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}; //delete an item


var deleteItem = function deleteItem(req, res) {
  var db_connection, myquery;
  return regeneratorRuntime.async(function deleteItem$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          try {
            db_connection = dbo.getDb();
            myquery = {
              _id: ObjectId(req.params.id)
            };
            db_connection.collection("items").deleteOne(myquery, function (err, result) {
              if (err) throw err;
              console.log("1 item deleted successfully");
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
          return _context5.stop();
      }
    }
  });
}; //Search items


var searchItem = function searchItem(req, res) {
  var db_connection, query, items;
  return regeneratorRuntime.async(function searchItem$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          db_connection = dbo.getDb();
          query = {
            title: {
              $regex: req.params.searchInput,
              $options: "i"
            }
          };
          console.log(query);
          _context6.next = 6;
          return regeneratorRuntime.awrap(db_connection.collection("items").find(query).toArray());

        case 6:
          items = _context6.sent;

          if (!(items.length === 0)) {
            _context6.next = 9;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            message: "No items found"
          }));

        case 9:
          console.log(items);
          res.status(200).json(items);
          _context6.next = 16;
          break;

        case 13:
          _context6.prev = 13;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: "Internal Server Error",
            error: _context6.t0.message
          });

        case 16:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 13]]);
}; //Exports function


module.exports = {
  getAllItems: getAllItems,
  getSingleItem: getSingleItem,
  createItem: createItem,
  updateItem: updateItem,
  deleteItem: deleteItem,
  searchItem: searchItem
};