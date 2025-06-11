/**
 * @file AdminCategoryPage.jsx
 * 
 * This file contains the AdminCategoryPage component which is responsible for rendering the admin page to manage categories.
 * 
 * @author teshan_kalhara
 * @created 6/11/2025
 * @updated 6/11/2025
 */

import React, { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate } from "react-router-dom";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await ApiService.getAllCategory();
      setCategories(response.categoryList || []);
    } catch (error) {
      console.log("Error fetching category list", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-category/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (confirmed) {
      try {
        await ApiService.deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.log("Error deleting category by id");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Categories</h2>
        <button
          onClick={() => navigate("/admin/add-category")}
          className="mb-4 bg-orange-500 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded"
        >
          Add Category
        </button>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex justify-between items-center border border-gray-300 rounded-md p-3"
            >
              <span className="text-gray-700">{category.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category.id)}
                  className="bg-orange-500 hover:bg-orange-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCategoryPage;
