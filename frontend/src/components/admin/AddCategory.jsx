/**
 * @file AddCategory.jsx
 * 
 * This file contains the AddCategory component which is responsible for rendering the form to add a new category.
 * 
 * @author teshan_kalhara
 * @created 6/3/2025
 * @updated 6/3/2025
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const AddCategory = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createCategory({ name });
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage('');
                    navigate("/admin/categories");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Failed to save a category");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-12 p-6 border border-gray-300 rounded-md shadow-sm bg-white">
            {message && (
                <p className="mb-4 p-3 text-sm text-white bg-green-500 rounded">
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <h2 className="text-2xl font-semibold mb-2">Add Category</h2>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 text-base"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded transition-colors duration-200"
                >
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddCategory;
