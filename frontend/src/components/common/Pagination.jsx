/**
 * @file Pagination.jsx
 * 
 * This file contains the Pagination component which is responsible for rendering the pagination buttons.
 * iOS 26 themed with glassmorphism, smooth transitions, and minimal aesthetic.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/24/2025
 */

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center my-8">
      <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-4 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`
              w-10 h-10 flex items-center justify-center rounded-full
              text-sm font-semibold transition-all duration-200
              ${number === currentPage
                ? "bg-white/50 text-gray-500 shadow-md scale-105"
                : "bg-white/20 text-gray-800 hover:bg-white/30 hover:shadow"
              }
              backdrop-blur-md border border-white/40
              focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
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