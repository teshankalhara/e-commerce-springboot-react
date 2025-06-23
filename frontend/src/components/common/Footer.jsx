/**
 * @file Footer.jsx
 * 
 * This file contains the Footer component which is displayed at the bottom of the page.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/23/2025
 */
import { NavLink } from "react-router-dom"
import { Twitter, Instagram, Facebook, Github } from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full bg-white/30 backdrop-blur-lg border-t border-gray-300 text-gray-800 py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-semibold">
          <NavLink to="/" className="hover:text-gray-600 transition">
            About Us
          </NavLink>
          <NavLink to="/" className="hover:text-gray-600 transition">
            Contact Us
          </NavLink>
          <NavLink to="/" className="hover:text-gray-600 transition">
            Terms & Conditions
          </NavLink>
          <NavLink to="/" className="hover:text-gray-600 transition">
            Privacy Policy
          </NavLink>
          <NavLink to="/" className="hover:text-gray-600 transition">
            FAQs
          </NavLink>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 text-gray-600">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-gray-800 transition">
            <Twitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-gray-800 transition">
            <Instagram size={20} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gray-800 transition">
            <Facebook size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-gray-800 transition">
            <Github size={20} />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500 select-none">
        © 2025 Clothez. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer

