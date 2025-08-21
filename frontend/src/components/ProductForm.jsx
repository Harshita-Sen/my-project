import React, { useState, useEffect } from "react";
import API from "../api";

const ProductForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    subCategoryId: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
    API.get("/subcategories").then((res) => setSubCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId || !form.subCategoryId) {
      return alert("All fields required");
    }
    await API.post("/products", form);
    alert("Product added ✅");
    setForm({ name: "", description: "", price: "", categoryId: "", subCategoryId: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
      <input
        type="text"
        placeholder="Product name"
        className="border p-2 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className="border p-2 rounded"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        className="border p-2 rounded"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />
      <select
        className="border p-2 rounded"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <select
        className="border p-2 rounded"
        value={form.subCategoryId}
        onChange={(e) => setForm({ ...form, subCategoryId: e.target.value })}
      >
        <option value="">Select SubCategory</option>
        {subCategories.map((sc) => (
          <option key={sc._id} value={sc._id}>{sc.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-purple-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default ProductForm;
