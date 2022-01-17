import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddDiscountToCategory from "./AddDiscountToCategory";

function CategoryDetails() {
  const params = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    await axios
      .get(`http://localhost:80/api/categories/${params.id}`)
      .then((response) => {
        setCategory(response.data);
        setLoading(true);
      });
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading) return null;

  return (
    <div>
      <h1>{category.name}</h1>
      <AddDiscountToCategory category={category} />
    </div>
  );
}

export default CategoryDetails;
