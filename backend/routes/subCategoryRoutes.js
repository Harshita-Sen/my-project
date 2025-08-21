const express = require("express");
const SubCategory = require("../models/SubCategory");
const Product = require("../models/Product");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const sub = await SubCategory.create({ name, categoryId });
    const populated = await sub.populate("categoryId", "name");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (_req, res) => {
  try {
    const subs = await SubCategory.find()
      .populate("categoryId", "name")
      .sort({ createdAt: -1 });
    res.json(subs);
  } catch {
    res.status(500).json({ error: "Error fetching subcategories" });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const sub = await SubCategory.findById(req.params.id).populate("categoryId", "name");
    if (!sub) return res.status(404).json({ error: "SubCategory not found" });
    res.json(sub);
  } catch {
    res.status(404).json({ error: "SubCategory not found" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const sub = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, categoryId },
      { new: true, runValidators: true }
    ).populate("categoryId", "name");
    if (!sub) return res.status(404).json({ error: "SubCategory not found" });
    res.json(sub);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE (block if products exist)
router.delete("/:id", async (req, res) => {
  try {
    const sid = req.params.id;
    const productCount = await Product.countDocuments({ subCategoryId: sid });
    if (productCount > 0) {
      return res.status(400).json({ error: "Delete products under this subcategory first." });
    }
    await SubCategory.findByIdAndDelete(sid);
    res.json({ message: "SubCategory deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting subcategory" });
  }
});

module.exports = router;
