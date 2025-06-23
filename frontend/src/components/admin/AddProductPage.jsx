/**
 * @file AddProductPage.jsx
 * 
 * This file contains the AddProductPage component which is responsible for rendering the form to add a new product.
 * 
 * @author teshan_kalhara
 * @created 6/10/2025
 * @updated 6/10/2025
 */

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"

const AddProductPage = () => {
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList))
  }, [])

  const handleImage = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("image", image)
      formData.append("categoryId", categoryId)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)

      const response = await ApiService.addProduct(formData)
      if (response.status === 200) {
        toast.success("Product added successfully")
        setTimeout(() => navigate("/admin/products"), 2000)
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Unable to upload product"
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-2xl p-10 space-y-6
          bg-white/30 backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
          text-gray-900
        "
      >
        <h2 className="text-center text-4xl font-bold mb-6 select-none drop-shadow">
          Add Product
        </h2>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-800">Image</label>
          <input
            type="file"
            onChange={handleImage}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-white/40 
            file:text-sm file:font-semibold file:bg-white/20 file:text-gray-900 
            file:backdrop-blur-md transition hover:file:bg-white/30 hover:file:border-white/60"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-800">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            className="
              px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md
              border border-white/30 shadow-inner
              text-gray-900 focus:outline-none
              focus:ring-2 focus:ring-gray-700/60
              transition
            "
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option value={cat.id} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-800">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
              px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md
              border border-white/30 shadow-inner
              text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-700/60
              transition
            "
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-800">Description</label>
          <textarea
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="
              px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md
              border border-white/30 shadow-inner
              text-gray-900 placeholder-gray-500 resize-none
              focus:outline-none focus:ring-2 focus:ring-gray-700/60
              transition
            "
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold text-gray-800">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="
              px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md
              border border-white/30 shadow-inner
              text-gray-900 placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-gray-700/60
              transition
            "
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProductPage
