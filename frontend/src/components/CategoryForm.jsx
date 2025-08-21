import React, { useState } from "react";
import API from "../api";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Category name is required");
    await API.post("/categories", { name });
    alert("Category added ✅");
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Category name"
        className="border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
};

export default CategoryForm;
