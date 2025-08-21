const express = require("express");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const category = await Category.create({ name: req.body.name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (_req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch {
    res.status(404).json({ error: "Category not found" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ error: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (block if subcategories/products exist)
router.delete("/:id", async (req, res) => {
  try {
    const cid = req.params.id;

    const subCount = await SubCategory.countDocuments({ categoryId: cid });
    if (subCount > 0) {
      return res.status(400).json({ error: "Delete subcategories under this category first." });
    }

    const productCount = await Product.countDocuments({ categoryId: cid });
    if (productCount > 0) {
      return res.status(400).json({ error: "Delete products under this category first." });
    }

    await Category.findByIdAndDelete(cid);
    res.json({ message: "Category deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting category" });
  }
});

module.exports = router;
