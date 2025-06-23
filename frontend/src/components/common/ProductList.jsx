/**
 * @file ProductList.jsx
 * 
 * This file contains the ProductList component which displays a list of products and allows users to add, increment, or decrement items in the cart.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/23/2025
 */
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Plus, Minus, ShoppingCart } from "lucide-react"

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart()

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product })
  }

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id)
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product })
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product })
    }
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 px-10 py-8 bg-gray-900/40 backdrop-blur-lg rounded-2xl max-w-7xl mx-auto">
      {products.map((product, index) => {
        const cartItem = cart.find((item) => item.id === product.id)
        return (
          <div
            key={index}
            className="w-64 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-transform hover:-translate-y-1 text-gray-100 flex flex-col"
          >
            <Link to={`/product/${product.id}`} className="block rounded-t-2xl overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            </Link>
            <div className="p-5 flex flex-col flex-grow">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold mb-1 hover:text-orange-400 transition">
                  {product.name}
                </h3>
                <p className="text-gray-300 text-sm mb-4 h-16 overflow-hidden">{product.description}</p>
              </Link>
              <span className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</span>

              {cartItem ? (
                <div className="flex items-center justify-center gap-3 mt-auto">
                  <button
                    onClick={() => decrementItem(product)}
                    aria-label="Decrease quantity"
                    className="flex items-center justify-center w-9 h-9 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-lg font-medium">{cartItem.quantity}</span>
                  <button
                    onClick={() => incrementItem(product)}
                    aria-label="Increase quantity"
                    className="flex items-center justify-center w-9 h-9 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-lg shadow-lg transition"
                >
                  <ShoppingCart size={20} />
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProductList

