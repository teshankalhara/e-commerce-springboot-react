/**
 * @file AddProductPage.jsx
 * 
 * This file contains the AddProductPage component which is responsible for rendering the form to add a new product.
 * 
 * @author teshan_kalhara
 * @created 6/10/2025
 * @updated 6/10/2025
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getAllCategory().then((res) => setCategories(res.categoryList));
  }, []);

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('categoryId', categoryId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);

      const response = await ApiService.addProduct(formData);
      if (response.status === 200) {
        setMessage(response.message);
        setTimeout(() => {
          setMessage('');
          navigate('/admin/products');
        }, 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || error.message || 'Unable to upload product');
    }
  };

  return (
    <div className="flex justify-center mt-10 mb-64">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl flex flex-col gap-4 p-6 border rounded-lg shadow-md bg-white"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>

        {message && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-center">
            {message}
          </div>
        )}

        <input
          type="file"
          onChange={handleImage}
          className="border p-2 rounded"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded resize-none"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
