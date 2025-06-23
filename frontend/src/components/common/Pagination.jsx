/**
 * @file Pagination.jsx
 * 
 * This file contains the Pagination component which is responsible for rendering the pagination buttons.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 5/5/2025
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="flex justify-center my-6">
      <div className="inline-flex bg-white/30 backdrop-blur-md border border-gray-300 rounded-xl shadow-inner px-3 py-2 gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`
              px-4 py-1 rounded-md font-medium transition
              ${
                number === currentPage
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-gray-900"
              }
              focus:outline-none focus:ring-2 focus:ring-orange-400
            `}
            aria-current={number === currentPage ? "page" : undefined}
            aria-label={`Go to page ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pagination

