/**
 * @file AdminOrderPage.jsx
 * 
 * This file contains the AdminOrderPage component which is responsible for rendering the admin order management page.
 * 
 * @author teshan_kalhara
 * @created 6/14/2025
 * @updated 6/14/2025
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../services/ApiService";

const OrderStatus = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED", "RETURNED"];

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 10;

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, [searchStatus, currentPage]);

    const fetchOrders = async () => {
        try {
            let response;
            if (searchStatus) {
                response = await ApiService.getAllOrderItemsByStatus(searchStatus);
            } else {
                response = await ApiService.getAllOrders();
            }
            const orderList = response.orderItemList || [];

            setTotalPages(Math.ceil(orderList.length / itemsPerPage));
            setOrders(orderList);
            setFilteredOrders(orderList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Unable to fetch orders');
            setTimeout(() => {
                setError('');
            }, 3000);
        }
    };

    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setStatusFilter(filterValue);
        setCurrentPage(1);

        if (filterValue) {
            const filtered = orders.filter(order => order.status === filterValue);
            setFilteredOrders(filtered.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(filtered.length / itemsPerPage));
        } else {
            setFilteredOrders(orders.slice(0, itemsPerPage));
            setTotalPages(Math.ceil(orders.length / itemsPerPage));
        }
    };

    const handleSearchStatusChange = (e) => {
        setSearchStatus(e.target.value);
        setCurrentPage(1);
    };

    const handleOrderDetails = (id) => {
        navigate(`/admin/order-details/${id}`);
    };

    return (
        <div className="max-w-[1200px] mx-auto px-5 py-6 overflow-x-hidden">
            <h2 className="text-3xl font-bold mb-6">Orders</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="flex flex-wrap gap-6 mb-6 items-end">
                <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold">Filter By Status</label>
                    <select
                        className="px-3 py-2 text-sm border rounded"
                        value={statusFilter}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col gap-2 ml-auto">
                    <label className="text-lg font-semibold">Search By Status</label>
                    <select
                        className="px-3 py-2 text-sm border rounded"
                        value={searchStatus}
                        onChange={handleSearchStatusChange}
                    >
                        <option value="">All</option>
                        {OrderStatus.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse mb-6">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="border px-4 py-2">Order ID</th>
                            <th className="border px-4 py-2">Customer</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Date Ordered</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map(order => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-100 even:bg-gray-50"
                            >
                                <td className="border px-4 py-2 text-center">{order.id}</td>
                                <td className="border px-4 py-2 text-center">{order.user.name}</td>
                                <td className="border px-4 py-2 text-center">{order.status}</td>
                                <td className="border px-4 py-2 text-center">${order.price.toFixed(2)}</td>
                                <td className="border px-4 py-2 text-center">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        className="px-4 py-2 text-white text-sm font-semibold rounded bg-orange-500 hover:bg-orange-700"
                                        onClick={() => handleOrderDetails(order.id)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default AdminOrdersPage;
