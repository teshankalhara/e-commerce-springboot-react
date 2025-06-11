/**
 * @file AdminOrderDetailsPage.jsx
 * 
 * This file contains the AdminOrderDetailsPage component which is responsible for rendering the details of a specific order in the admin panel.
 * 
 * @author teshan_kalhara
 * @created 6/11/2025
 * @updated 6/11/2025
 */

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(orderItemId, selectedStatus[orderItemId]);
      setMessage("Order item status was successfully updated.");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || "Unable to update order item status");
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 mb-24">
      {message && (
        <div className="text-center mb-5 text-green-600 font-semibold">{message}</div>
      )}
      <h2 className="text-center text-2xl font-bold mb-6">Order Details</h2>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div key={orderItem.id} className="border border-gray-300 rounded-md p-6 mb-6 bg-white shadow">
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Order Information</h3>
              <p><strong>Order Item ID:</strong> {orderItem.id}</p>
              <p><strong>Quantity:</strong> {orderItem.quantity}</p>
              <p><strong>Total Price:</strong> ${orderItem.price}</p>
              <p><strong>Order Status:</strong> {orderItem.status}</p>
              <p><strong>Date Ordered:</strong> {new Date(orderItem.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">User Information</h3>
              <p><strong>Name:</strong> {orderItem.user.name}</p>
              <p><strong>Email:</strong> {orderItem.user.email}</p>
              <p><strong>Phone:</strong> {orderItem.user.phoneNumber}</p>
              <p><strong>Role:</strong> {orderItem.user.role}</p>
              <div className="mt-3">
                <h3 className="font-semibold text-md mb-1">Delivery Address</h3>
                <p><strong>Country:</strong> {orderItem.user.address?.country}</p>
                <p><strong>State:</strong> {orderItem.user.address?.state}</p>
                <p><strong>City:</strong> {orderItem.user.address?.city}</p>
                <p><strong>Street:</strong> {orderItem.user.address?.street}</p>
                <p><strong>Zip Code:</strong> {orderItem.user.address?.zipcode}</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">Product Information</h3>
              <img
                src={orderItem.product.imageUrl}
                alt={orderItem.product.name}
                className="w-32 h-32 object-cover rounded border mb-2"
              />
              <p><strong>Name:</strong> {orderItem.product.name}</p>
              <p><strong>Description:</strong> {orderItem.product.description}</p>
              <p><strong>Price:</strong> ${orderItem.product.price}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Change Status</h4>
              <div className="flex items-center">
                <select
                  className="border border-gray-300 px-3 py-2 rounded"
                  value={selectedStatus[orderItem.id] || orderItem.status}
                  onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}
                >
                  {OrderStatus.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleSubmitStatusChange(orderItem.id)}
                  className="ml-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">Loading order details ...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
