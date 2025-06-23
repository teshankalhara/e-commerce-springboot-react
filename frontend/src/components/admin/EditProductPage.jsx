/**
 * @file EditProductPage.jsx
 * 
 * This file contains the EditProductPage component which is responsible for rendering the product edit form in the admin panel.
 * 
 * @author teshan_kalhara
 * @created 6/14/2025
 * @updated 6/24/2025
 */
import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"

const EditProductPage = () => {
  const { productId } = useParams()
  const [image, setImage] = useState(null)
  const [categories, setCategories] = useState([])
  const [categoryId, setCategoryId] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList))

    if (productId) {
      ApiService.getProductById(productId).then((res) => {
        setName(res.product.name)
        setDescription(res.product.description)
        setPrice(res.product.price)
        setCategoryId(res.product.categoryId)
        setImageUrl(res.product.imageUrl)
      })
    }
  }, [productId])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setImageUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      if (image) formData.append("image", image)
      formData.append("productId", productId)
      formData.append("categoryId", categoryId)
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)

      const res = await ApiService.updateProduct(formData)
      if (res.status === 200) {
        toast.success("Product updated successfully")
        setTimeout(() => navigate("/admin/products"), 1500)
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to update product")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl p-10 bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] space-y-6"
      >
        <h2 className="text-center text-4xl font-bold text-gray-900 mb-4 select-none drop-shadow">
          Edit Product
        </h2>

        <input
          type="file"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-white/40 
            file:text-sm file:font-semibold file:bg-white/20 file:text-gray-900 
            file:backdrop-blur-md transition hover:file:bg-white/30 hover:file:border-white/60"
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="max-w-[120px] mx-auto rounded-lg shadow"
          />
        )}

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
        />

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Update Product
        </button>
      </form>
    </div>
  )
}

export default EditProductPage
