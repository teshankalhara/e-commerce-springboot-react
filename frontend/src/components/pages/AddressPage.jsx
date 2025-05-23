/**
 * @file AddressPage.jsx
 * 
 * This file contains the AddressPage component, which is used to display the address form.
 * 
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 5/23/2025
 * 
 */

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

const AddressPage = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/edit-address') {
      fetchUserInfo();
    }
  }, [location.pathname]);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      if (response.user.address) {
        setAddress(response.user.address);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user information");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.saveAddress(address);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to save/update address");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6">
        {location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}
      </h2>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {["street", "city", "state", "zipCode", "country"].map((field) => (
          <label key={field} className="mb-4 font-medium capitalize">
            {field === "zipCode" ? "Zip Code" : field}
            <input
              type="text"
              name={field}
              value={address[field]}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
        ))}
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-700 transition duration-200"
        >
          {location.pathname === '/edit-address' ? 'Edit Address' : 'Save Address'}
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
