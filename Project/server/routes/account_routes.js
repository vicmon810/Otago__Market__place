const express = require("express");
const { getUser, getAdmin } = require("../controllers/accountController");

const routes = express.Router();

//GET a Single account profile page
routes.get("/account/:id", getUser);
//GET a ADMIN Page
routes.get("/account/admin", (req, res) => {
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
