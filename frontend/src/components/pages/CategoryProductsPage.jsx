/**
 * @file CategoryProductsPage.jsx
 * 
 * This file contains the CategoryProductsPage component, which is used to display products by category.
 * 
 * @author teshan_kalhara
 * @created 5/26/2025
 * @updated 5/26/2025
 */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";

const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProducts();
    }, [categoryId, currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await ApiService.getAllProductsByCategoryId(categoryId);
            const allProducts = response.productList || [];
            setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
            setProducts(
                allProducts.slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage
                )
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to fetch products by category ID"
            );
        }
    };

    return (
        <div className="p-5">
            {error ? (
                <p className="text-center text-red-600 text-xl mt-6">{error}</p>
            ) : (
                <div>
                    <ProductList products={products} />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;
