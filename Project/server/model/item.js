const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    Product: {
      Product_id: String, // Unique identifier for the product
      Product_name: String, // Name of the product
      Quantity: Number, // Number of units available
      Locations: [String], // List of locations where the product is available
      Product_Description: String, // Description of the product
      product_Category: String, // Category of the product
      Create_Date: Date, // Date and time when the product was created
      Owner_Account: String, // Account name of the product owner
      Owner_Contact: {
        // Contact information of the product owner
        Email: String,
        Phone: String,
      },
      Image: String, // URL of the product image
      Product_Features: {
        // Features of the product
        Connectivity: String,
        Layout: String,
        Backlit: Boolean,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("item", itemSchema);
