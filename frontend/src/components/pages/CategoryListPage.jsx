/**
 * @file CategoryListPage.jsx
 * 
 * This file contains the CategoryListPage component, which is used to display a list of product categories.
 * 
 * @author teshan_kalhara
 * @created 5/26/2025
 * @updated 6/24/2025
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getAllCategory();
            setCategories(response.categoryList || []);
            setError(null);
        } catch (err) {
            setError(
                err.response?.data?.message || err.message || "Unable to fetch categories"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId) => {
        navigate(`/category/${categoryId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6 pt-12 pb-24">
            <div
                className="max-w-5xl mx-auto w-full bg-white/30 backdrop-blur-xl border border-white/30
          rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] p-10 flex flex-col gap-8"
            >
                <h2 className="text-4xl font-extrabold text-center text-gray-800 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                    Categories
                </h2>

                {loading ? (
                    <p className="text-center text-gray-600 text-lg select-none">Loading categories...</p>
                ) : error ? (
                    <p className="text-red-600 text-center text-lg select-none">{error}</p>
                ) : (
                    <ul className="flex flex-wrap justify-center gap-6">
                        {categories.map((category) => (
                            <li
                                key={category.id}
                                className="flex-1 max-w-[28%] min-w-[160px]"
                            >
                                <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="
                    w-full
                    py-5
                    rounded-2xl
                    bg-white/25
                    backdrop-blur-md
                    border border-white/40
                    text-gray-900
                    font-semibold
                    text-lg
                    shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_8px_24px_rgba(0,0,0,0.1)]
                    transition
                    hover:bg-white/40 hover:shadow-[inset_0_5px_15px_rgba(255,255,255,0.65),0_10px_32px_rgba(0,0,0,0.15)]
                    active:scale-95
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100
                    select-none
                  "
                                    aria-label={`View category ${category.name}`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default CategoryListPage;
