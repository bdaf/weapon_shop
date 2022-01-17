import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Row, FloatingLabel, Form, Button, Alert } from "react-bootstrap";
import Select from "react-select";

function AddDiscountToCategory(props){

  const [feedback, setFeedback] = useState(null);
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState({});
  const [discountOptions, setDiscountOptions] = useState([]);

  const fetchDate = async () => {
    await axios.get("http://localhost:80/api/discounts").then((response) => {
      console.log("fetchDate()");
      const discountOptions = response.data.map((d) => {
          const discountLabel = (d.percent*100)+'% - From: '+ d.fromDate + ', To: ' + d.toDate;
        return { value: d.discountId, label: discountLabel };
      });
      setDiscountOptions(discountOptions);
      console.log(discountOptions);
    });
  };

  useEffect(() => {
    fetchDate();
  }, []);

  useEffect(() => {
      setFeedback(null)
  }, [category])

  const addDiscountToCategoryHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:80/api/categories/${props.category.categoryId}`, {discountId: discount.discountId})
      .then((response) => {
        // props.onChange((prevState) => !prevState);
        if (response.status === 200)
          setFeedback(
            <Alert variant="success">Zniżka została dodana do kategorii!</Alert>
          );
        else
          setFeedback(
            <Alert variant="danger">Nie udało się dodać zniżki!</Alert>
          );
      })
      .catch((e) => {
        console.log(e);

        setFeedback(
          <Alert variant="danger">
            Nastąpił błąd podczas próby wywołania metody http!
          </Alert>
        );
      });
  };

  const setDiscountsHandler = (e) => {
    // setName(e.label);
    // setDiscounts(e);
    setFeedback(null);
    setDiscount({discountId: e.value});
  };
  return (
    <div className="m-3">
      <h2>All discounts from database:</h2>
      <Form onSubmit={(e) => addDiscountToCategoryHandler(e)}>
        <Row className="mb-3">
          <Col xs={6} md={6}>
            <Select
              onChange={(e) => setDiscountsHandler(e)}
              options={discountOptions}
              placeholder="Discounts"
            />
          </Col>
        </Row>
        {feedback != null ? feedback : null }
        <Button
          className="ps-4 pe-4"
          variant="outline-danger"
          type="submit"
          disabled={feedback == null ? false : true}
        >
          Add discount to category
        </Button>
      </Form>
    </div>
  );
};

export default AddDiscountToCategory;
