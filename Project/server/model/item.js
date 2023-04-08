const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    Product_id: { type: String, require: true },
    Product_name: { type: String, require: true },
    Quantity: { type: Number, require: true },
    Locations: { type: [String], require: true },
    Product_description: { type: String, require: true },
    product_category: { type: String, require: true },
    Create_time: { type: Date, require: true },
    Owner_account: { type: String, require: true },
    Owner_contact: {
      Email: { type: String, require: true },
      Phone: { type: String, require: true },
    },
    Image: { type: String, require: true },
    Product_Features: { type: [String], require: true },
    Tags: { type: [String], require: false },
  },
  { timestamps: true }
);

const item = mongoose.model("item", itemSchema);
module.exports = item;
