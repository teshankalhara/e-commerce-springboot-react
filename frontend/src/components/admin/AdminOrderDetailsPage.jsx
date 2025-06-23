/**
 * @file AdminOrderDetailsPage.jsx
 * 
 * This file contains the AdminOrderDetailsPage component which is responsible for rendering the details of a specific order in the admin panel.
 * 
 * @author teshan_kalhara
 * @created 6/11/2025
 * @updated 6/24/2025
 */

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast, { Toaster } from "react-hot-toast"
import { CheckCircle } from "lucide-react"

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams()
  const [orderItems, setOrderItems] = useState([])
  const [selectedStatus, setSelectedStatus] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    fetchOrderDetails(itemId)
  }, [itemId])

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId)
      setOrderItems(response.orderItemList)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to load order details")
    }
  }

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus })
  }

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(orderItemId, selectedStatus[orderItemId])
      toast.success("Order item status was successfully updated")
      fetchOrderDetails(itemId)
      navigate(`/admin/orders`)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to update order item status")
    }
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center bg-white/10 backdrop-blur-[40px] transition-all duration-300">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(255,255,255,0.2)",
            color: "#111",
            border: "1px solid rgba(255,255,255,0.3)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            fontWeight: "500",
          },
        }}
      />
      <div className="w-full max-w-4xl space-y-8">
        <h2 className="text-4xl font-semibold text-center text-gray-900 drop-shadow-lg">Order Details</h2>

        {orderItems.length ? (
          orderItems.map((orderItem) => (
            <div
              key={orderItem.id}
              className="bg-white/20 backdrop-blur-[36px] border border-white/30 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_32px_rgba(31,38,135,0.25)] p-8 space-y-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(31,38,135,0.35)]"
            >
              {/* Order Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Order Info</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  <p><strong>ID:</strong> {orderItem.id}</p>
                  <p><strong>Quantity:</strong> {orderItem.quantity}</p>
                  <p><strong>Total:</strong> ${orderItem.price}</p>
                  <p><strong>Status:</strong> {orderItem.status}</p>
                  <p><strong>Ordered:</strong> {new Date(orderItem.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {/* User Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">User Info</h3>
                <div className="grid grid-cols-2 gap-4 text-gray-800">
                  <p><strong>Name:</strong> {orderItem.user.name}</p>
                  <p><strong>Email:</strong> {orderItem.user.email}</p>
                  <p><strong>Phone:</strong> {orderItem.user.phoneNumber}</p>
                  <p><strong>Role:</strong> {orderItem.user.role}</p>
                </div>
                <div className="mt-3 text-gray-800">
                  <h4 className="font-semibold mb-1">Delivery Address</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <p><strong>Country:</strong> {orderItem.user.address?.country}</p>
                    <p><strong>State:</strong> {orderItem.user.address?.state}</p>
                    <p><strong>City:</strong> {orderItem.user.address?.city}</p>
                    <p><strong>Street:</strong> {orderItem.user.address?.street}</p>
                    <p><strong>Zip:</strong> {orderItem.user.address?.zipcode}</p>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Product Info</h3>
                <div className="flex gap-6 items-start">
                  <img
                    src={orderItem.product.imageUrl}
                    alt={orderItem.product.name}
                    className="w-32 h-32 object-cover rounded-xl border border-white/30 shadow-md"
                  />
                  <div className="space-y-1 text-gray-800">
                    <p><strong>Name:</strong> {orderItem.product.name}</p>
                    <p><strong>Description:</strong> {orderItem.product.description}</p>
                    <p><strong>Price:</strong> ${orderItem.product.price}</p>
                  </div>
                </div>
              </div>

              {/* Status Control */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Change Status</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <select
                    value={selectedStatus[orderItem.id] || orderItem.status}
                    onChange={(e) => handleStatusChange(orderItem.id, e.target.value)}
                    className="bg-white/30 backdrop-blur-[18px] border border-white/40 text-gray-900 px-4 py-2 rounded-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  >
                    {OrderStatus.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSubmitStatusChange(orderItem.id)}
                    className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg mt-12">Loading order details...</p>
        )}
      </div>
    </div>
  )
}

export default AdminOrderDetailsPage
