const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  inStock: Boolean,
  tags: [String],
  price:Number
});

module.exports = mongoose.model("Product", ProductSchema);
