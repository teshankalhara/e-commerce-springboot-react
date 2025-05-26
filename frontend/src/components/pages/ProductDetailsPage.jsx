/**
 * @file ProductDetailsPage.jsx
 * 
 * This file contains the ProductDetailsPage component, which is used to display the details of a specific product.
 * 
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 5/26/2025
 * 
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../services/ApiService";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(productId);
      setProduct(response.product);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
      }
    }
  };

  if (!product) {
    return <p className="text-center mt-10 text-lg">Loading product details...</p>;
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="max-w-md mx-auto mt-40 mb-40 p-6 border border-gray-300 rounded-lg flex flex-col items-center gap-4 shadow-sm">
      <img src={product?.imageUrl} alt={product?.name} className="w-full max-w-sm object-contain" />
      <h1 className="text-2xl font-semibold text-center">{product?.name}</h1>
      <p className="text-gray-600 text-center">{product?.description}</p>
      <span className="text-xl font-bold text-orange-500">${product.price.toFixed(2)}</span>

      {cartItem ? (
        <div className="flex items-center gap-4">
          <button
            onClick={decrementItem}
            className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-700 rounded"
          >
            -
          </button>
          <span className="text-lg font-semibold">{cartItem.quantity}</span>
          <button
            onClick={incrementItem}
            className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-700 rounded"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={addToCart}
          className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white text-lg rounded"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default ProductDetailsPage;
