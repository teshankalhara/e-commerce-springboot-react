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
import { Twitter, Instagram, Facebook, Github, Info, Phone, FileText, Lock, HelpCircle } from "lucide-react"

const links = [
  { label: "About Us", to: "/", Icon: Info },
  { label: "Contact Us", to: "/", Icon: Phone },
  { label: "Terms & Conditions", to: "/", Icon: FileText },
  { label: "Privacy Policy", to: "/", Icon: Lock },
  { label: "FAQs", to: "/", Icon: HelpCircle }
]

const socialLinks = [
  { href: "https://twitter.com", label: "Twitter", Icon: Twitter },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://github.com", label: "GitHub", Icon: Github }
]

const Footer = () => {
  return (
    <footer
      className="w-full bg-white/20 backdrop-blur-[60px] border-t border-white/30 rounded-t-3xl 
    shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-1px_1.5px_rgba(255,255,255,0.3),0_8px_24px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]
    text-gray-700 py-12 px-10 select-none font-sans z-50 relative">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Navigation Links with Icons */}
        <nav className="flex flex-wrap justify-center gap-12 text-sm font-semibold text-gray-700">
          {links.map(({ label, to, Icon }) => (
            <NavLink
              key={label}
              to={to}
              className="flex items-center gap-2 hover:text-gray-600 transition-colors duration-300 ease-in-out"
            >
              <Icon size={20} className="stroke-gray-600" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-10 text-gray-700">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-gray-600 transition-colors duration-300 ease-in-out"
            >
              <Icon size={24} className="stroke-gray-600" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500 tracking-wide font-light">
        © 2025 Clothez. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
