const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({});

const item = mongoose.model("item", itemSchema);
module.exports = item;
