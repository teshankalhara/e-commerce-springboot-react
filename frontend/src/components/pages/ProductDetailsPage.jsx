/**
 * @file ProductDetailsPage.jsx
 * 
 * @description Displays detailed product info with iOS 26 glass effect theme and modern aesthetic.
 * @author teshan_kalhara
 * @created 5/23/2025
 * @updated 6/24/2025
 */
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useCart } from "../context/CartContext"
import ApiService from "../../services/ApiService"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"

const ProductDetailsPage = () => {
  const { productId } = useParams()
  const { cart, dispatch } = useCart()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await ApiService.getProductById(productId)
      setProduct(response.product)
    } catch (error) {
      console.error(error.message || error)
      toast.error("Failed to load product details")
    }
  }

  const notifyAdd = () => toast.success("Added to cart!")
  const notifyIncrement = () => toast.success("Increased quantity!")
  const notifyDecrement = () => toast.success("Decreased quantity!")

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product })
      notifyAdd()
    }
  }

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product })
      notifyIncrement()
    }
  }

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id)
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product })
        notifyDecrement()
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product })
        toast("Removed from cart", { icon: "🗑️" })
      }
    }
  }

  if (!product) {
    return (
      <div className="text-center mt-40 text-gray-500 text-lg font-medium">
        Loading product details...
      </div>
    )
  }

  const cartItem = cart.find((item) => item.id === product.id)

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-4 py-24">
        <div className="max-w-lg w-full p-8 rounded-3xl border border-white/30 bg-white/30 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] space-y-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-72 object-contain rounded-xl shadow-md"
          />

          <h1 className="text-3xl font-extrabold text-center text-gray-800">{product.name}</h1>
          <p className="text-gray-700 text-center text-base leading-relaxed">{product.description}</p>
          <p className="text-center text-2xl font-bold text-gray-500">${product.price.toFixed(2)}</p>

          {cartItem ? (
            <div className="flex items-center justify-center gap-3 mt-auto">
              <button
                onClick={decrementItem}
                className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                aria-label="Decrease quantity"
              >
                <Minus size={18} />
              </button>
              <span className="text-base font-medium text-gray-900 select-none">{cartItem.quantity}</span>
              <button
                onClick={incrementItem}
                className="w-9 h-9 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                aria-label="Increase quantity"
              >
                <Plus size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={addToCart}
              className="mt-auto w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductDetailsPage
