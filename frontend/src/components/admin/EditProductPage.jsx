/**
 * @file EditProductPage.jsx
 * 
 * This file contains the EditProductPage component which is responsible for rendering the product edit form in the admin panel.
 * 
 * @author teshan_kalhara
 * @created 6/14/2025
 * @updated 6/14/2025
 */
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";

const EditProductPage = () => {
    const { productId } = useParams();
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        ApiService.getAllCategory().then((res) => setCategories(res.categoryList));

        if (productId) {
            ApiService.getProductById(productId).then((response) => {
                setName(response.product.name);
                setDescription(response.product.description);
                setPrice(response.product.price);
                setCategoryId(response.product.categoryId);
                setImageUrl(response.product.imageUrl);
            });
        }
    }, [productId]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            if (image) {
                formData.append("image", image);
            }
            formData.append("productId", productId);
            formData.append("categoryId", categoryId);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);

            const response = await ApiService.updateProduct(formData);
            if (response.status === 200) {
                setMessage(response.message);
                setTimeout(() => {
                    setMessage("");
                    navigate("/admin/products");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || error.message || "Unable to update product");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto mb-64 p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            {message && <div className="text-red-600 font-medium mb-3">{message}</div>}

            <input
                type="file"
                onChange={handleImageChange}
                className="mb-3"
            />

            {imageUrl && (
                <img src={imageUrl} alt={name} className="max-w-[100px] mb-3" />
            )}

            <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mb-3 p-2 border border-gray-300 rounded text-base"
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>{cat.name}</option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3 p-2 border border-gray-300 rounded text-base"
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-3 p-2 border border-gray-300 rounded text-base"
            />

            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mb-3 p-2 border border-gray-300 rounded text-base"
            />

            <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded transition-colors duration-200"
            >
                Update
            </button>
        </form>
    );
};

export default EditProductPage;
