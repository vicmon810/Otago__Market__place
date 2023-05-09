"use strict";

var express = require("express");

var _require = require("../controllers/accountController"),
    getUser = _require.getUser,
    getAdmin = _require.getAdmin,
    createAccount = _require.createAccount,
    updateUser = _require.updateUser,
    deleteUser = _require.deleteUser,
    messageUser = _require.messageUser,
    verifyLogin = _require.verifyLogin,
    getUserByEmail = _require.getUserByEmail;

var routes = express.Router(); //GET a Single account profile page

routes.get("/account/:id", getUser); //GET a Single account profile page BY EMAIL

routes.get("/account/email/:email", getUserByEmail); //GET a ADMIN Page

routes.get("/admin", getAdmin); // POST a new account

routes.post("/account", createAccount); //DELETE an account

routes["delete"]("/account/:id", deleteUser); // UPDATE an account

routes.patch("/account/:id", updateUser); // POST a message

routes.post("/message", messageUser); //POST login

routes.post("/login", verifyLogin);
module.exports = routes;