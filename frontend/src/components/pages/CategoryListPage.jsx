/**
 * @file CategoryListPage.jsx
 * 
 * This file contains the CategoryListPage component, which is used to display a list of product categories.
 * 
 * @author teshan_kalhara
 * @created 5/26/2025
 * @updated 5/26/2025
 */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Unable to fetch categories"
            );
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-sm">
            {error ? (
                <p className="text-red-600 text-center text-lg mt-6">{error}</p>
            ) : (
                <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Categories</h2>
                    <ul className="flex flex-wrap justify-center gap-5">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className="flex-1 max-w-[30%] min-w-[180px]"
                            >
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="w-full bg-orange-500 hover:bg-orange-700 text-white text-lg px-4 py-3 rounded-md transition-colors"
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoryListPage;
