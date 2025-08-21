import React, { useState, useEffect } from "react";
import API from "../api";

const SubCategoryForm = () => {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !categoryId) return alert("All fields required");
    await API.post("/subcategories", { name, categoryId });
    alert("SubCategory added ✅");
    setName("");
    setCategoryId("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="SubCategory name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="border p-2 rounded"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default SubCategoryForm;
