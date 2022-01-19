import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import axios from "axios";
import ProductsList from "../Components/Product/ProductsBuyList";
import styles from "../Components/Product/ProductsList.module.css";

const api = axios.create({
  baseURL: "http://localhost:80/api/products",
});

function ProductsBuy(props) {
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProducts, setLoadedProducts] = useState([]);

  const fetchAllProducts = async () => {
    await api.get("/").then(function (response) {
      setIsLoading(false);
      setLoadedProducts(response.data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const showFeedback = function (typeOfFeedback, text) {
    setFeedback(<Alert variant={typeOfFeedback}>{text}</Alert>);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <br></br>
          <h2>Products for you to Buy!</h2>
          <div className={styles.filter}>
              <input className={styles.input} type="text" required id="filter" />
              <button className="btn btn-dark">Filter</button>
              </div>
      <ProductsList
        products={loadedProducts}
        updateProducts={fetchAllProducts}
        showFeedback={showFeedback}
      />
    </div>
  );
}

export default ProductsBuy;
