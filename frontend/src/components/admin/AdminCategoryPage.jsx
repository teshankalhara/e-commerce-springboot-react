/**
 * @file AdminCategoryPage.jsx
 * 
 * This file contains the AdminCategoryPage component which is responsible for rendering the admin page to manage categories.
 * 
 * @author teshan_kalhara
 * @created 6/11/2025
 * @updated 6/23/2025
 */
import React, { useState, useEffect } from "react"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await ApiService.getAllCategory()
      setCategories(res.categoryList || [])
    } catch (err) {
      console.log("Error fetching category list", err)
      toast.error("Failed to load categories")
    }
  }

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?")
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id)
        toast.success("Category deleted successfully")
        fetchCategories()
      } catch (err) {
        console.log("Error deleting category by id", err)
        toast.error("Failed to delete category")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-3xl bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] p-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 select-none drop-shadow">
          Manage Categories
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/admin/add-category")}
            className="w-full py-4 px-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            + Add Category
          </button>
        </div>

        <ul className="space-y-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center p-4 bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-inner"
            >
              <span className="text-gray-900 font-medium">{category.name}</span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleEdit(category.id)}
                  className="w-full py-4 px-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="w-full py-4 px-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminCategoryPage
