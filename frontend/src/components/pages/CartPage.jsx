/**
 * @file CartPage.jsx
 * 
 * This file contains the CartPage component, which is used to display the user's shopping cart.
 * 
 * @author teshan_kalhara
 * @created 5/26/2025
 * @updated 5/26/2025
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

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

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("You need to login first before you can place an order");
            setTimeout(() => {
                setMessage('');
                navigate("/login");
            }, 3000);
            return;
        }

        const orderItems = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const orderRequest = {
            totalPrice,
            items: orderItems,
        };

        try {
            const response = await ApiService.createOrder(orderRequest);
            setMessage(response.message);
            setTimeout(() => setMessage(''), 5000);

            if (response.status === 200) {
                dispatch({ type: 'CLEAR_CART' });
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-10 px-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Cart</h1>

            {message && (
                <p className="text-orange-500 text-xl font-semibold text-center mb-4">{message}</p>
            )}

            {cart.length === 0 ? (
                <p className="text-gray-600 text-lg">Your cart is empty</p>
            ) : (
                <div>
                    <ul className="space-y-5">
                        {cart.map(item => (
                            <li key={item.id} className="border border-gray-300 rounded-md p-4 flex items-center space-x-4">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => decrementItem(item)}
                                            className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => incrementItem(item)}
                                            className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="mt-2 text-gray-700 font-medium">${item.price.toFixed()}</div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <h2 className="text-2xl font-bold mt-6 text-gray-800">
                        Total: ${totalPrice.toFixed(2)}
                    </h2>

                    <button
                        onClick={handleCheckout}
                        className="w-full mt-4 bg-orange-500 hover:bg-orange-700 text-white text-xl py-4 rounded-md transition-colors"
                    >
                        Checkout
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
