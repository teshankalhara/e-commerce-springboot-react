/**
 * @file Navbar.jsx
 * 
 * This file contains the Navbar component which is responsible for rendering the navigation bar of the application.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React, { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import ApiService from "../../service/ApiService"

const Navbar = () => {
    const [searchValue, setSearchValue] = useState("")
    const navigate = useNavigate();

    const isAdmin = ApiService.isAdmin();
    const isAuthenticated = ApiService.isAuthenticated()

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/?search=${searchValue}`)
    }

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            ApiService.logout();
            setTimeout(() => {
                navigate("/login")
            }, 500);
        }
    }

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center bg-orange-500 p-4 text-white gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
                <NavLink to="/">
                    {/* <img src="/" alt="Clothez" className="h-10" /> */}
                    <h1 className="text-2xl font-bold">Clothez</h1>
                </NavLink>
            </div>

            {/* Search */}
            <form 
                onSubmit={handleSearchSubmit} 
                className="flex items-center w-full max-w-xl"
            >
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className="flex-grow px-4 py-2 rounded-l-md border-none focus:outline-none text-black"
                />
                <button
                    type="submit"
                    className="bg-white text-orange-500 font-bold px-4 py-2 rounded-r-md hover:bg-gray-100"
                >
                    Search
                </button>
            </form>

            {/* Links */}
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm font-bold">
                <NavLink to="/" className="hover:text-gray-200">Home</NavLink>
                <NavLink to="/categories" className="hover:text-gray-200">Categories</NavLink>
                {isAuthenticated && (
                    <NavLink to="/profile" className="hover:text-gray-200">My Account</NavLink>
                )}
                {isAdmin && (
                    <NavLink to="/admin" className="hover:text-gray-200">Admin</NavLink>
                )}
                {!isAuthenticated && (
                    <NavLink to="/login" className="hover:text-gray-200">Login</NavLink>
                )}
                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="hover:text-red-300"
                    >
                        Logout
                    </button>
                )}
                <NavLink to="/cart" className="hover:text-gray-200">Cart</NavLink>
            </div>
        </nav>
    )
}

export default Navbar
