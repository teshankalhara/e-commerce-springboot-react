/**
 * @file ProfilePage.jsx
 * 
 * This file contains the ProfilePage component, which is used to display the user's profile information.
 * 
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 5/26/2025
 * 
 */
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import Pagination from "../common/Pagination"

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const navigate = useNavigate()

  useEffect(() => {
    fetchUserInfo()
  }, [])

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo()
      setUserInfo(response.user)
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user info")
    }
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address")
  }

  if (!userInfo)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white to-gray-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-white/30 backdrop-blur-md rounded-full shadow-lg mb-4" />
          <div className="h-6 bg-white/20 rounded w-48 mb-2" />
          <div className="h-4 bg-white/20 rounded w-64" />
        </div>
      </div>
    )

  const orderItemList = userInfo.orderItemList || []
  const totalPages = Math.ceil(orderItemList.length / itemsPerPage)
  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 py-12 px-6 text-gray-900">
      <div
        className="
          max-w-5xl mx-auto p-10
          bg-white/20 backdrop-blur-xl
          border border-white/30
          rounded-3xl
          shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
        "
      >
        <h2
          className="
            text-center text-4xl font-extrabold mb-10 
            text-gray-800 drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)] select-none
          "
        >
          Welcome, {userInfo.name}
        </h2>

        {error ? (
          <p className="text-red-600 text-center text-lg">{error}</p>
        ) : (
          <>
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold">
                {userInfo.name.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            {/* User Info Cards */}
            <section className="mb-12 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: "Name", value: userInfo.name },
                { label: "Email", value: userInfo.email },
                { label: "Phone Number", value: userInfo.phoneNumber || "Not provided" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="
                    bg-white/20 backdrop-blur-xl border border-white/40 rounded-3xl
                    px-8 py-6 shadow-[inset_0_3px_10px_rgba(255,255,255,0.35),0_12px_36px_rgba(0,0,0,0.12)]
                    hover:shadow-[inset_0_5px_14px_rgba(255,255,255,0.5),0_16px_40px_rgba(0,0,0,0.16)]
                    transition-shadow duration-300 cursor-default
                  "
                >
                  <p className="text-sm text-gray-700 font-semibold mb-3 select-none tracking-wide">
                    {label}
                  </p>
                  <p className="font-semibold text-gray-800 select-text break-words text-lg">
                    {value}
                  </p>
                </div>
              ))}
            </section>

            {/* Address Section */}
            <section className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-800 select-none tracking-tight">
                  Address
                </h3>
                <button
                  onClick={handleAddressClick}
                  className="
                    px-6 py-3 bg-gray-800 text-white rounded-2xl font-semibold
                    hover:bg-gray-700 shadow-lg transition duration-200
                  "
                >
                  {userInfo.address ? "Edit Address" : "Add Address"}
                </button>
              </div>

              {userInfo.address ? (
                <div
                  className="
                    bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl
                    px-8 py-6 shadow-[inset_0_3px_10px_rgba(255,255,255,0.3)]
                    space-y-2 text-gray-800 select-text
                  "
                >
                  <p><span className="font-medium">Street:</span> {userInfo.address.street}</p>
                  <p><span className="font-medium">City:</span> {userInfo.address.city}</p>
                  <p><span className="font-medium">State:</span> {userInfo.address.state}</p>
                  <p><span className="font-medium">Zip Code:</span> {userInfo.address.zipCode}</p>
                  <p><span className="font-medium">Country:</span> {userInfo.address.country}</p>
                </div>
              ) : (
                <p className="text-gray-600 italic select-none">No Address information available</p>
              )}
            </section>

            {/* Order History Section */}
            <section>
              <h3 className="text-3xl font-bold mb-8 text-gray-800 select-none tracking-tight">
                Order History
              </h3>

              {paginatedOrders.length > 0 ? (
                <ul className="space-y-8">
                  {paginatedOrders.map((order) => (
                    <li
                      key={order.id}
                      className="
                        flex items-center gap-8
                        bg-white/25 backdrop-blur-lg border border-white/40
                        rounded-3xl p-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.35),0_14px_36px_rgba(0,0,0,0.15)]
                        hover:brightness-105 transition
                      "
                    >
                      <img
                        src={order.product?.imageUrl}
                        alt={order.product?.name}
                        className="w-28 h-28 rounded-2xl object-cover shadow-md select-none"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2 select-text break-words text-xl">
                          {order.product.name}
                        </p>
                        <p className="text-gray-700 select-none text-sm">Status: {order.status}</p>
                        <p className="text-gray-700 select-none text-sm">Quantity: {order.quantity}</p>
                        <p className="text-gray-700 select-none text-sm">
                          Price: ${order.price.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic select-none text-center">No orders found.</p>
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </div >
  )
}

export default ProfilePage