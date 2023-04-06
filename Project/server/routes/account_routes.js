const express = require("express");
const routes = express.Router();

//GET All accounts
//routes.get("account/", getAllItems);
//GET a Single account profile page
routes.get("account/:id", (req, res) => {
  res.josn({ mssg: "account" });
});
//GET a ADMIN Page
routes.get("account/admin", (req, res) => {
  res.json({ mssg: "ADMIN" });
});
// POST a new account
routes.post("/account", (req, res) => {
  res.json({ mssg: "post accoutn" });
});

//DELETE an account
routes.delete("account/:id", (req, res) => {
  res.json({ mssg: "DELETE new item" });
});
// UPDATE an account
routes.patch("account/:id", (req, res) => {
  res.json({ mssg: "UPDATE new item" });
});

module.exports = routes;
