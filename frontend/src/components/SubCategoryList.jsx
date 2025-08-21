import { useState } from "react";
import axios from "axios";

export default function SubCategoryList({ categories, subCategories, fetchSubCategories }) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = async () => {
    if (!name || !categoryId) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/subcategories/${editId}`, {
        name,
        categoryId,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/subcategories", { name, categoryId });
    }
    fetchSubCategories();
    setName("");
    setCategoryId("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
    fetchSubCategories();
  };

  const handleEdit = (s) => {
    setName(s.name);
    setCategoryId(s.categoryId?._id || "");
    setEditId(s._id);
  };

  return (
    <div>
      <h2>SubCategories</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="SubCategory name" />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>

      <ul>
        {subCategories.map((s) => (
          <li key={s._id}>
            {s.name} ({s.categoryId?.name})
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
