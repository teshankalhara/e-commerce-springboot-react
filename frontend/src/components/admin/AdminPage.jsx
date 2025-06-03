/**
 * @file AdminPage.jsx
 * 
 * This file contains the AdminPage component which is responsible for rendering the admin dashboard.
 * 
 * @author teshan_kalhara
 * @created 6/3/2025
 * @updated 6/3/2025
 */

import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-start py-16 space-y-6">
            <h1 className="text-4xl font-bold mb-6">Welcome Admin</h1>

            <button
                onClick={() => navigate("/admin/categories")}
                className="w-1/3 min-w-[250px] py-4 text-lg font-semibold rounded-md bg-orange-500 text-white hover:bg-orange-700 transition"
            >
                Manage Categories
            </button>

            <button
                onClick={() => navigate("/admin/products")}
                className="w-1/3 min-w-[250px] py-4 text-lg font-semibold rounded-md bg-orange-500 text-white hover:bg-orange-700 transition"
            >
                Manage Products
            </button>

            <button
                onClick={() => navigate("/admin/orders")}
                className="w-1/3 min-w-[250px] py-4 text-lg font-semibold rounded-md bg-orange-500 text-white hover:bg-orange-700 transition"
            >
                Manage Orders
            </button>
        </div>
    );
};

export default AdminPage;
