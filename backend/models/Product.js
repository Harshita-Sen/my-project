const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },   // 👈 price ko Number rakho
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory", required: true },
});

module.exports = mongoose.model("Product", productSchema);
