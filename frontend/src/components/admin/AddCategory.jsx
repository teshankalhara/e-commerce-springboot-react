/**
 * @file AddCategory.jsx
 * 
 * This file contains the AddCategory component which is responsible for rendering the form to add a new category.
 * 
 * @author teshan_kalhara
 * @created 6/3/2025
 * @updated 6/23/2025
 */

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"

const AddCategory = () => {
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ApiService.createCategory({ name })
      if (response.status === 200) {
        toast.success("Category added successfully!")
        setTimeout(() => navigate("/admin/categories"), 1500)
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to add category"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-xl p-10 bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]">
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-10 select-none drop-shadow">
          Add Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-800 select-none">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddCategory
