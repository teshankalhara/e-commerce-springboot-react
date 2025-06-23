/**
 * @file AdminProductPage.jsx
 * 
 * This file contains the AdminProductPage component which is responsible for rendering the admin product management page.
 * 
 * @author teshan_kalhara
 * @created 6/10/2025
 * @updated 6/24/2025
 */

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../common/Pagination"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"
import { Edit2, Trash2 } from "lucide-react"

const AdminProductPage = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 10

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProducts()
      const productList = response.productList || []
      setTotalPages(Math.ceil(productList.length / itemsPerPage))
      setProducts(
        productList.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      )
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to fetch products")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage])

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?")
    if (confirmed) {
      try {
        await ApiService.deleteProduct(id)
        toast.success("Product deleted successfully")
        fetchProducts()
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Unable to delete product")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] p-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 select-none drop-shadow">
            Products
          </h2>
          <button
            onClick={() => navigate("/admin/add-product")}
            className="w-[200px] py-4 px-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            + Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-700 italic py-20 select-none">
            No products found. Please add new products.
          </p>
        ) : (
          <>
            <ul className="space-y-4">
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center p-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-inner"
                >
                  <span className="text-gray-900 font-medium flex-1">
                    {product.name}
                  </span>
                  <div className="flex space-x-2">

                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-4 py-2 rounded-3xl
                        bg-white/30 backdrop-blur-xl border border-white/40 text-gray-900 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_30px_rgba(0,0,0,0.05)]
                        hover:bg-white/50 hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.9),0_12px_40px_rgba(0,0,0,0.08)] transition active:scale-95 active:brightness-90
                        focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-gray-100 flex items-center gap-2"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-4 py-2 rounded-3xl bg-red-500/30 backdrop-blur-xl border   
                          border-red-500/50 text-red-700 font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_10px_30px_rgba(139,0,0,0.06)]
                          hover:bg-red-500/50 hover:shadow-[inset_0_2px_10px_rgba(255,255,255,0.7),0_12px_40px_rgba(139,0,0,0.1)] transition active:scale-95 active:brightness-90
                          focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-100
                          flex items-center gap-2"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminProductPage
