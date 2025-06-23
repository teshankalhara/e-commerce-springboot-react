/**
 * @file Navbar.jsx
 * @description Navigation bar component for the Clothez application.
 * 
 * @author teshan
 * @created 5/5/2025
 * @updated 6/23/2025
 */

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import {
    Home,
    LayoutGrid,
    User,
    LogIn,
    LogOut,
    Shield,
    ShoppingCart,
    Search,
} from "lucide-react";

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated();

    const handleSearchChange = (e) => setSearchValue(e.target.value);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/?search=${encodeURIComponent(searchValue)}`);
        }
    };

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            ApiService.logout();
            setTimeout(() => navigate("/login"), 500);
        }
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/20 border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-3">

                {/* Logo */}
                <NavLink to="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition">
                    Clothez
                </NavLink>

                {/* Search */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex w-full max-w-lg bg-white/90 rounded-xl overflow-hidden backdrop-blur-sm shadow-inner focus-within:ring-2 focus-within:ring-gray-400"
                >
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 text-gray-900 bg-transparent focus:outline-none placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 hover:bg-gray-900 transition"
                    >
                        <Search className="h-5 w-5" />
                    </button>
                </form>

                {/* Navigation Links with Icons */}
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 text-sm font-medium text-gray-900">

                    <NavLink to="/" className="flex items-center gap-2 hover:text-gray-700 transition">
                        <Home size={18} />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/categories" className="flex items-center gap-2 hover:text-gray-700 transition">
                        <LayoutGrid size={18} />
                        <span>Categories</span>
                    </NavLink>

                    {isAuthenticated && (
                        <NavLink to="/profile" className="flex items-center gap-2 hover:text-gray-700 transition">
                            <User size={18} />
                            <span>My Account</span>
                        </NavLink>
                    )}

                    {isAdmin && (
                        <NavLink to="/admin" className="flex items-center gap-2 hover:text-gray-700 transition">
                            <Shield size={18} />
                            <span>Admin</span>
                        </NavLink>
                    )}

                    {!isAuthenticated ? (
                        <NavLink to="/login" className="flex items-center gap-2 hover:text-gray-700 transition">
                            <LogIn size={18} />
                            <span>Login</span>
                        </NavLink>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 hover:text-red-600 transition"
                        >
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    )}

                    <NavLink to="/cart" className="flex items-center gap-2 hover:text-gray-700 transition">
                        <ShoppingCart size={18} />
                        <span>Cart</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;