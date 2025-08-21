import { useState, useEffect } from "react";
import axios from "axios";
import CategoryList from "./components/CategoryList";
import SubCategoryList from "./components/SubCategoryList";
import ProductList from "./components/ProductList";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  const fetchSubCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/subcategories");
    setSubCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  return (
    <div style={{gap: "30px" }}>
      <h1>E-Commerce App</h1>
      <CategoryList
        categories={categories}
        fetchCategories={fetchCategories}
      />
      <SubCategoryList
        categories={categories}
        subCategories={subCategories}
        fetchSubCategories={fetchSubCategories}
      />
      <ProductList
        categories={categories}
        subCategories={subCategories}
      />
    </div>
  );
}
