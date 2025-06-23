/**
 * @file ProductList.jsx
 * 
 * This file contains the ProductList component which displays a list of products and allows users to add, increment, or decrement items in the cart.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/24/2025
 */
import React from "react"
import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

const ProductList = ({ products }) => {
  const { cart, dispatch } = useCart()

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
    toast.success(`Added "${product.name}" to cart`)
  }

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product })
    toast.success(`Increased quantity of "${product.name}"`)
  }

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id)
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product })
      toast.success(`Decreased quantity of "${product.name}"`)
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product })
      toast.error(`Removed "${product.name}" from cart`)
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 px-10 py-10 max-w-7xl mx-auto bg-white/10 backdrop-blur-2xl rounded-3xl shadow-inner border border-white/20">
        {products.map((product, index) => {
          const cartItem = cart.find((item) => item.id === product.id)
          return (
            <div
              key={index}
              className="
                w-72 rounded-3xl border border-white/20
                bg-white/10 backdrop-blur-xl p-4
                shadow-[0_8px_30px_rgba(0,0,0,0.1)]
                hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)]
                transition duration-300 ease-in-out
                flex flex-col text-gray-900
              "
            >
              <Link to={`/product/${product.id}`} className="block overflow-hidden rounded-2xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </Link>

              <div className="mt-4 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-xl font-semibold leading-snug mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-700 h-12 overflow-hidden">{product.description}</p>
                </Link>

                <span className="text-lg font-bold mt-2 mb-4">${product.price.toFixed(2)}</span>

                {cartItem ? (
                  <div className="flex items-center justify-center gap-3 mt-auto">
                    <button
                      onClick={() => decrementItem(product)}
                      className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-base font-medium text-gray-900 select-none">{cartItem.quantity}</span>
                    <button
                      onClick={() => incrementItem(product)}
                      className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProductList