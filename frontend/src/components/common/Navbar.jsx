/**
 * @file Navbar.jsx
 * @description Navigation bar component for the Clothez application.
 * 
 * @author teshan
 * @created 5/5/2025
 * @updated 6/23/2025
 */

import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import {
    Home,
    LayoutGrid,
    User,
    LogIn,
    LogOut,
    Shield,
    ShoppingCart,
    Search,
} from "lucide-react"

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate()

    const isAdmin = ApiService.isAdmin()
    const isAuthenticated = ApiService.isAuthenticated()

    const handleSearchChange = (e) => setSearchValue(e.target.value)

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            navigate(`/?search=${encodeURIComponent(searchValue)}`)
        }
    }

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?")) {
            ApiService.logout()
            setTimeout(() => navigate("/login"), 500)
        }
    }

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 py-4">

                {/* Logo */}
                <NavLink
                    to="/"
                    className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition select-none drop-shadow-sm"
                >
                    Clothez
                </NavLink>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex w-full max-w-lg bg-white/25 backdrop-blur-xl border border-white/30 rounded-3xl shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-white/60 transition"
                >
                    <input
                        type="search"
                        value={searchValue}
                        onChange={handleSearchChange}
                        placeholder="Search products..."
                        className="flex-grow px-5 py-3 bg-transparent text-gray-900 placeholder-gray-500 text-base font-medium focus:outline-none focus-visible:outline-none"
                        spellCheck="false"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        aria-label="Search"
                        className="flex items-center justify-center px-5 py-3  bg-white/40 
                        backdrop-blur-md border border-white/40 
                        rounded-3xl text-gray-900 shadow-sm transition 
                        hover:bg-white/70 hover:shadow-lg hover:scale-[1.05] 
                        active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 
                        focus:ring-white/70  focus:ring-offset-1 focus:ring-offset-gray-100"
                    >
                        <Search className="w-6 h-6" />
                    </button>
                </form>


                {/* Nav Links */}
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
    )
}

export default Navbar
