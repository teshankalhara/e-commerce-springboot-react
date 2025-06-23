/**
 * @file LoginPage.jsx
 *
 * This file contains the LoginPage component, which is used to display the login form.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/23/2025
 */

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ApiService.loginUser(formData)
      if (response.status === 200) {
        toast.success("User Successfully Logged in")
        localStorage.setItem("token", response.token)
        localStorage.setItem("role", response.role)
        setTimeout(() => {
          navigate("/profile")
        }, 3000)
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Unable to login")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white/50 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight text-center select-none drop-shadow-sm">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-900 select-none">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900 select-none">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-800 mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-gray-900 hover:underline font-semibold">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
