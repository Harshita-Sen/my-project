const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Add Product
router.post("/", async (req, res) => {
  try {
    const { name, price, categoryId, subCategoryId } = req.body;

    if (!name || !price || !categoryId || !subCategoryId) {
      return res.status(400).json({ error: "All fields required" });
    }

    const product = new Product({ name, price, categoryId, subCategoryId });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId", "name")
      .populate("subCategoryId", "name");
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete Product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
