const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    email: {type: String, require:true},
    password: {type: String, require:true},
    number: {type: Number, require:true},
    department: {type: String, require:true},
    activationDate: { type: Date, require: true},
    },{ timestamps:true }
    );

module.exports = accountSchema;