import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProductById } from "../data/products";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    // Fetch product details based on the id from the URL
    const getProducts = getProductById(id);
    if (!getProducts) {
      navigate("/");
      return;
    }
    setProduct(getProducts);
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  const ifProductIsInCart = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = ifProductIsInCart
    ? `(${ifProductIsInCart.quantity})`
    : "";
  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-container">
            <h2 className="product-detail-name">{product.name}</h2>
            <p className="product-detail-description">{product.description}</p>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart {productQuantityLabel}
            </button>{" "}
            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              {" "}
              Go Back{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
