/**
 * @file ProductList.jsx
 * 
 * This file contains the ProductList component which displays a list of products and allows users to add, increment, or decrement items in the cart.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const incrementItem = (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
    };

    const decrementItem = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
        }
    };

    return (
        <div className="flex flex-wrap gap-5 justify-center px-20 py-6">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div
                        key={index}
                        className="w-64 border border-gray-200 shadow-sm hover:shadow-lg transition-transform hover:-translate-y-1 text-center"
                    >
                        <Link to={`/product/${product.id}`} className="block">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-52 object-cover"
                            />
                            <h3 className="text-gray-800 text-lg font-semibold mt-2">{product.name}</h3>
                            <p className="text-gray-500 text-sm mx-5 mt-1 h-16 overflow-hidden">{product.description}</p>
                            <span className="block text-gray-800 text-base font-semibold my-2">${product.price.toFixed(2)}</span>
                        </Link>

                        {cartItem ? (
                            <div className="flex items-center justify-center my-3">
                                <button
                                    onClick={() => decrementItem(product)}
                                    className="bg-orange-500 hover:bg-orange-800 text-white px-3 py-1 rounded text-lg"
                                >
                                    -
                                </button>
                                <span className="mx-3 text-lg text-gray-700">{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className="bg-orange-500 hover:bg-orange-800 text-white px-3 py-1 rounded text-lg"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="bg-orange-500 hover:bg-[#633d17] text-white font-medium px-4 py-2 my-2 rounded"
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;
