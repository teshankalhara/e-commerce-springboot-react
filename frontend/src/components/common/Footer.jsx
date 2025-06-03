/**
 * @file Footer.jsx
 * 
 * This file contains the Footer component which is displayed at the bottom of the page.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React from "react"
import { NavLink } from "react-router-dom"

const Footer = () => {
    return (
        <footer className="bottom-0 w-full bg-gray-800 text-white text-center py-5 z-50 mt-10">
            <div className="flex justify-center mb-3 flex-wrap gap-6 text-sm font-semibold">
                <NavLink to="/" className="hover:text-gray-300">About Us</NavLink>
                <NavLink to="/" className="hover:text-gray-300">Contact Us</NavLink>
                <NavLink to="/" className="hover:text-gray-300">Terms & Conditions</NavLink>
                <NavLink to="/" className="hover:text-gray-300">Privacy Policy</NavLink>
                <NavLink to="/" className="hover:text-gray-300">FAQs</NavLink>
            </div>
            <div className="text-xs">
                <p>&copy; 2025 Clothez. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer
