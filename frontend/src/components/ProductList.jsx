import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductList({ categories, subCategories }) {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    if (!name || !price || !categoryId || !subCategoryId) return;
    if (editId) {
      await axios.put(`http://localhost:5000/api/products/${editId}`, {
        name,
        price,
        categoryId,
        subCategoryId,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/products", {
        name,
        price,
        categoryId,
        subCategoryId,
      });
    }
    fetchProducts();
    setName("");
    setPrice("");
    setCategoryId("");
    setSubCategoryId("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (p) => {
    setName(p.name);
    setPrice(p.price);
    setCategoryId(p.categoryId?._id || "");
    setSubCategoryId(p.subCategoryId?._id || "");
    setEditId(p._id);
  };

  return (
    <div>
      <h2>Products</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" />
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
        <option value="">Select SubCategory</option>
        {subCategories
          .filter((s) => s.categoryId?._id === categoryId)
          .map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
      </select>

      <button onClick={handleAdd}>{editId ? "Update" : "Add"}</button>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ₹{p.price} ({p.categoryId?.name} → {p.subCategoryId?.name})
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
