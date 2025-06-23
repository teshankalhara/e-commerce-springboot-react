/**
 * @file AddressPage.jsx
 * 
 * This file contains the AddressPage component, which is used to display the address form.
 * 
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 6/23/2025
 * 
 */

import React, { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import ApiService from "../../services/ApiService"

const AddressPage = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/edit-address") {
      fetchUserInfo()
    }
  }, [location.pathname])

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo()
      if (response.user.address) {
        setAddress(response.user.address)
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Unable to fetch user information"
      )
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setAddress((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await ApiService.saveAddress(address);
      navigate("/profile")
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Failed to save/update address"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white/50 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
     
        <h2 className="text-center text-3xl font-extrabold mb-8 select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
          {location.pathname === "/edit-address" ? "Edit Address" : "Add Address"}
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-6 font-semibold select-none">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {["street", "city", "state", "zipCode", "country"].map((field) => (
            <label
              key={field}
              className="flex flex-col mb-2 font-semibold capitalize text-gray-900"
            >
              {field === "zipCode" ? "Zip Code" : field}
              <input
                type="text"
                name={field}
                value={address[field]}
                onChange={handleChange}
                required
                placeholder={`Enter your ${field === "zipCode" ? "Zip Code" : field}`}
                className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
            />
            </label>
          ))}

          <button
            type="submit"
            className="w-full py-4 mt-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            {location.pathname === "/edit-address" ? "Edit Address" : "Save Address"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddressPage


