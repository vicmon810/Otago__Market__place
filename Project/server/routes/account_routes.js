const express = require("express");
const {
  getUser,
  getAdmin,
  createAccount,
  updateUser,
  deleteUser,
  messageUser,
} = require("../controllers/accountController");

const routes = express.Router();

//GET a Single account profile page
routes.get("/account/:id", getUser);
//GET a ADMIN Page
routes.get("/admin", getAdmin);
// POST a new account
routes.post("/account", createAccount);
//DELETE an account
routes.delete("/account/:id", deleteUser);
// UPDATE an account
routes.patch("/account/:id", updateUser);
// POST a message
routes.post("/message", messageUser);

module.exports = routes;
