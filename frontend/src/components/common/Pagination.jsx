/**
 * @file Pagination.jsx
 * 
 * This file contains the Pagination component which is responsible for rendering the pagination buttons.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React from "react"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="flex justify-center my-4 mb-32">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-5 py-2 mx-1 rounded 
                        transition-colors duration-300 
                        text-white font-medium 
                        ${number === currentPage 
                            ? 'bg-orange-500' 
                            : 'bg-gray-700 hover:bg-orange-900'}`}
                >
                    {number}
                </button>
            ))}
        </div>
    )
}

export default Pagination
