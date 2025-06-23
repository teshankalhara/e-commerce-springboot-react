/**
 * @file CartPage.jsx
 * 
 * This file contains the CartPage component, which is used to display the user's shopping cart.
 * 
 * @author teshan_kalhara
 * @created 5/26/2025
 * @updated 6/24/2025
 */
import React from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import { useCart } from "../context/CartContext"
import toast, { Toaster } from "react-hot-toast"

const CartPage = () => {
  const { cart, dispatch } = useCart()
  const navigate = useNavigate()

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product })
    toast(`Added item "${product.name}"`)
  }

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id)
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product })
      toast(`Remove item "${product.name}"`)
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product })
      toast.error(`Removed "${product.name}" from cart`)
    }
  }

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      toast.error("You need to login first before you can place an order")
      setTimeout(() => {
        navigate("/login")
      }, 3000)
      return
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }))

    const orderRequest = {
      totalPrice,
      items: orderItems,
    }

    try {
      const response = await ApiService.createOrder(orderRequest)
      toast.success(response.message || "Order placed successfully!")

      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" })
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to place an order"
      )
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 px-6 py-12 flex justify-center items-start">
        <div
          className="
            max-w-4xl w-full
            bg-white/30 backdrop-blur-xl
            border border-white/30
            rounded-3xl
            shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
            p-8
            flex flex-col gap-8
          "
        >
          <h1 className="text-4xl font-extrabold text-center text-gray-800 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
            Cart
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-700 text-center text-lg select-none">
              Your cart is empty
            </p>
          ) : (
            <>
              <ul className="space-y-6 max-h-[60vh] overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="
                      flex items-center gap-6
                      bg-white/25 backdrop-blur-md
                      border border-white/40
                      rounded-2xl
                      shadow-[inset_0_3px_8px_rgba(255,255,255,0.5),0_8px_24px_rgba(0,0,0,0.1)]
                      p-4
                      transition
                      hover:shadow-[inset_0_5px_15px_rgba(255,255,255,0.65),0_10px_32px_rgba(0,0,0,0.15)]
                    "
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {item.name}
                        </h2>
                        <p className="text-gray-700 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={() => decrementItem(item)}
                          className="
                            w-10 h-10 flex items-center justify-center
                            rounded-xl bg-white/40 border border-white/40
                            backdrop-blur-md
                            text-gray-800
                            hover:bg-white/60
                            transition
                            active:scale-95
                            shadow
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100
                          "
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementItem(item)}
                          className="
                            w-10 h-10 flex items-center justify-center
                            rounded-xl bg-white/40 border border-white/40
                            backdrop-blur-md
                            text-gray-800
                            hover:bg-white/60
                            transition
                            active:scale-95
                            shadow
                            focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100
                          "
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>
                        <span className="ml-auto text-lg font-bold text-gray-900">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900 select-none">
                  Total: ${totalPrice.toFixed(2)}
                </h2>

                <button
                  onClick={handleCheckout}
                  className="
                    bg-white/30 backdrop-blur-xl border border-white/30
                    rounded-3xl
                    px-8 py-4
                    text-gray-900 font-semibold text-xl
                    shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                    hover:bg-white/50 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)]
                    transition
                    active:scale-95 active:brightness-90
                    focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-gray-100
                  "
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CartPage