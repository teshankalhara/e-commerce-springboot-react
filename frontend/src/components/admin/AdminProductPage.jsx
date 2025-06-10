/**
 * @file AdminProductPage.jsx
 * 
 * This file contains the AdminProductPage component which is responsible for rendering the admin product management page.
 * 
 * @author teshan_kalhara
 * @created 6/10/2025
 * @updated 6/10/2025
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import ApiService from "../../services/ApiService";

const AdminProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      const productList = response.productList || [];
      setTotalPages(Math.ceil(productList.length / itemsPerPage));
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch products"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.message ||
            "Unable to delete product"
        );
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 text-base">
      {error ? (
        <p className="text-red-600 text-center font-medium">{error}</p>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-700">Products</h2>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => navigate("/admin/add-product")}
            >
              Add Product
            </button>
          </div>

          <ul className="space-y-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border border-gray-300 rounded px-4 py-3"
              >
                <span className="text-gray-800 flex-1">{product.name}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
