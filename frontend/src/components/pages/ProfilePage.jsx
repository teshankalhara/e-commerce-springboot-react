/**
 * @file ProfilePage.jsx
 * 
 * This file contains the ProfilePage component, which is used to display the user's profile information.
 * 
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 5/23/2025
 * 
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user info");
    }
  };

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  if (!userInfo) return <div className="text-center mt-10 text-lg">Loading...</div>;

  const orderItemList = userInfo.orderItemList || [];
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);
  const paginatedOrders = orderItemList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-12 p-6 border border-orange-200 rounded-xl bg-white shadow-sm">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">Welcome {userInfo.name}</h2>

      {error ? (
        <p className="text-red-600 text-center text-lg mt-4">{error}</p>
      ) : (
        <div>
          <div className="mb-6">
            <p><strong className="text-orange-500 text-lg">Name:</strong> {userInfo.name}</p>
            <p><strong className="text-orange-500 text-lg">Email:</strong> {userInfo.email}</p>
            <p><strong className="text-orange-500 text-lg">Phone Number:</strong> {userInfo.phoneNumber}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-2">Address</h3>
            {userInfo.address ? (
              <div className="space-y-1">
                <p><strong className="text-orange-500">Street:</strong> {userInfo.address.street}</p>
                <p><strong className="text-orange-500">City:</strong> {userInfo.address.city}</p>
                <p><strong className="text-orange-500">State:</strong> {userInfo.address.state}</p>
                <p><strong className="text-orange-500">Zip Code:</strong> {userInfo.address.zipCode}</p>
                <p><strong className="text-orange-500">Country:</strong> {userInfo.address.country}</p>
              </div>
            ) : (
              <p className="text-gray-600">No Address information available</p>
            )}
            <button
              className="mt-4 px-6 py-2 bg-orange-500 text-white text-lg font-semibold rounded hover:bg-orange-700 transition"
              onClick={handleAddressClick}
            >
              {userInfo.address ? "Edit Address" : "Add Address"}
            </button>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Order History</h3>
          <ul className="space-y-4">
            {paginatedOrders.map((order) => (
              <li
                key={order.id}
                className="flex items-center p-4 border rounded-md hover:bg-gray-100 transition"
              >
                <img
                  src={order.product?.imageUrl}
                  alt={order.product?.name}
                  className="w-20 h-20 object-cover rounded mr-6"
                />
                <div>
                  <p><strong className="text-orange-500">Name:</strong> {order.product.name}</p>
                  <p><strong className="text-orange-500">Status:</strong> {order.status}</p>
                  <p><strong className="text-orange-500">Quantity:</strong> {order.quantity}</p>
                  <p><strong className="text-orange-500">Price:</strong> ${order.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
