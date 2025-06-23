/**
 * @file AdminOrderPage.jsx
 * 
 * This file contains the AdminOrderPage component which is responsible for rendering the admin order management page.
 * 
 * @author teshan_kalhara
 * @created 6/14/2025
 * @updated 6/24/2025
 */

import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../common/Pagination"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"
import { Eye } from "lucide-react"

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"]

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [statusFilter, setStatusFilter] = useState("")
    const [searchStatus, setSearchStatus] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [error, setError] = useState(null)
    const itemsPerPage = 10

    const navigate = useNavigate()

    // Ref to track if toast was shown for current error
    const errorToastShown = useRef(false)

    // Reset toast shown flag when error changes or clears
    useEffect(() => {
        if (!error) {
            errorToastShown.current = false
        }
    }, [error])

    useEffect(() => {
        fetchOrders()
    }, [searchStatus, currentPage])

    const fetchOrders = async () => {
        try {
            let response
            if (searchStatus) {
                response = await ApiService.getAllOrderItemsByStatus(searchStatus)
            } else {
                response = await ApiService.getAllOrders()
            }
            const orderList = response.orderItemList || []

            setTotalPages(Math.ceil(orderList.length / itemsPerPage))
            setOrders(orderList)
            setFilteredOrders(orderList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage))
            setError(null)
        } catch (error) {
            const msg = error.response?.data?.message || error.message || "Unable to fetch orders"

            setError(msg)
            if (!errorToastShown.current) {
                toast.error(msg)
                errorToastShown.current = true
            }
            // Optional: Clear error message after delay
            setTimeout(() => {
                setError(null)
            }, 1000)
        }
    }

    const handleFilterChange = (e) => {
        const filterValue = e.target.value
        setStatusFilter(filterValue)
        setCurrentPage(1)

        if (filterValue) {
            const filtered = orders.filter((order) => order.status === filterValue)
            setFilteredOrders(filtered.slice(0, itemsPerPage))
            setTotalPages(Math.ceil(filtered.length / itemsPerPage))
        } else {
            setFilteredOrders(orders.slice(0, itemsPerPage))
            setTotalPages(Math.ceil(orders.length / itemsPerPage))
        }
    }

    const handleSearchStatusChange = (e) => {
        setSearchStatus(e.target.value)
        setCurrentPage(1)
    }

    const handleOrderDetails = (id) => {
        navigate(`/admin/order-details/${id}`)
    }

    return (
        <div className="min-h-screen bg-[rgba(255,255,255,0.15)] backdrop-blur-[40px] p-6 flex flex-col items-center">
            <div className="w-full max-w-5xl rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_4px_30px_rgba(255,255,255,0.3)] p-8">
                <h2 className="text-4xl font-semibold text-gray-900 mb-8 select-none drop-shadow-lg">
                    Orders
                </h2>

                {error && <p className="mb-6 text-center text-red-600 font-semibold">{error}</p>}

                <div className="flex flex-wrap gap-6 mb-8 items-end">
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-900 font-semibold text-lg">Filter By Status</label>
                        <select
                            className="
                px-4 py-3 rounded-xl bg-white/30
                backdrop-blur-md border border-white/40
                text-gray-900 placeholder-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-700/60
                transition
              "
                            value={statusFilter}
                            onChange={handleFilterChange}
                        >
                            <option className="bg-white/80 text-gray-900" value="">
                                All
                            </option>
                            {OrderStatus.map((status) => (
                                <option key={status} className="bg-white/80 text-gray-900" value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 ml-auto">
                        <label className="text-gray-900 font-semibold text-lg">Search By Status</label>
                        <select
                            className="
                px-4 py-3 rounded-xl bg-white/30
                backdrop-blur-md border border-white/40
                text-gray-900 placeholder-gray-700
                focus:outline-none focus:ring-2 focus:ring-gray-700/60
                transition
              "
                            value={searchStatus}
                            onChange={handleSearchStatusChange}
                        >
                            <option className="bg-white/80 text-gray-900" value="">
                                All
                            </option>
                            {OrderStatus.map((status) => (
                                <option key={status} className="bg-white/80 text-gray-900" value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div
                    className="
    overflow-x-auto rounded-[2rem]
    bg-gradient-to-br from-white/10 via-white/5 to-white/10
    border border-white/20 backdrop-blur-[36px]
    shadow-[inset_0_4px_12px_rgba(255,255,255,0.15),0_12px_40px_rgba(31,38,135,0.1)]
    transition-all duration-500 ease-in-out
  "
                >
                    <table className="min-w-full table-auto border-collapse text-gray-900">
                        <thead>
                            <tr className="bg-white/10 text-center text-gray-800 font-semibold text-base">
                                <th className="border border-white/20 px-6 py-4 rounded-tl-[2rem]">Order ID</th>
                                <th className="border border-white/20 px-6 py-4">Customer</th>
                                <th className="border border-white/20 px-6 py-4">Status</th>
                                <th className="border border-white/20 px-6 py-4">Price</th>
                                <th className="border border-white/20 px-6 py-4">Date Ordered</th>
                                <th className="border border-white/20 px-6 py-4 rounded-tr-[2rem]">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="even:bg-white/5 odd:bg-white/10 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] cursor-pointer transition-all duration-300 ease-in-out text-gray-800"
                                    >
                                        <td className="border border-white/20 px-6 py-4 text-center font-mono">{order.id}</td>
                                        <td className="border border-white/20 px-6 py-4 text-center">{order.user?.name || "N/A"}</td>
                                        <td className="border border-white/20 px-6 py-4 text-center font-medium">{order.status}</td>
                                        <td className="border border-white/20 px-6 py-4 text-center">${order.price.toFixed(2)}</td>
                                        <td className="border border-white/20 px-6 py-4 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="border border-white/20 px-6 py-4 text-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleOrderDetails(order.id)
                                                }}
                                                className="inline-flex items-center gap-2 px-5 py-2 
                                                rounded-full bg-white/20 backdrop-blur-[18px] border 
                                                border-white/40 text-gray-800 font-semibold 
                                                shadow-[0_2px_12px_rgba(255,255,255,0.3)] 
                                                hover:bg-white/30 hover:shadow-[0_4px_24px_rgba(255,255,255,0.4)] 
                                                active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 
                                                focus:ring-offset-2 focus:ring-offset-white/20 transition-all duration-200 ease-out"
                                            >
                                                <Eye size={18} className="opacity-80" />
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600 italic">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminOrdersPage
