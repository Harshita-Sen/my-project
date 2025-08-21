import { useState } from "react";
import axios from "axios";

export default function CategoryList({ categories, fetchCategories }) {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAdd = async () => {
    if (!name) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/categories/${editId}`, { name });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/categories", { name });
    }
    fetchCategories();
    setName("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/categories/${id}`);
    fetchCategories();
  };

  const handleEdit = (c) => {
    setName(c.name);
    setEditId(c._id);
  };

  return (
    <div>
      <h2>Categories</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
      <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>

      <ul>
        {categories.map((c) => (
          <li key={c._id}>
            {c.name}
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
