const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // هنا ممكن تحط لينك صورة
  },
  stock: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);