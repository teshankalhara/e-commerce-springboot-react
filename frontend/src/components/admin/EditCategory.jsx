/**
 * @file AdminOrderPage.jsx
 * 
 * This file contains the AdminOrderPage component which is responsible for rendering the admin order management page.
 * 
 * @author teshan_kalhara
 * @created 6/14/2025
 * @updated 6/14/2025
 */

import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
    const { categoryId } = useParams();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategory(categoryId);
    }, [categoryId]);

    const fetchCategory = async () => {
        try {
            const response = await ApiService.getCategoryById(categoryId);
            setName(response.category.name);
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to get category by ID");
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.updateCategory(categoryId, { name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save category");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-300 rounded-md">
            {message && (
                <p className="mb-4 text-center text-red-600 font-semibold">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2 mb-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold py-3 px-6 rounded-md transition-colors duration-200"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditCategory;
