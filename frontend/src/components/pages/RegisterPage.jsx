/**
 * @file RegisterPage.jsx
 * 
 * This file contains the RegisterPage component, which is used for user registration.
 * 
 * @author teshan_kalhara
 * @created 5/5/2025
 * @updated 6/23/2025
 */

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../services/ApiService"
import toast from "react-hot-toast"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    password: ''
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await ApiService.registerUser(formData)
      if (response.status === 200) {
        toast.success("User Successfully Registered")
        setTimeout(() => {
          navigate("/login")
        }, 3000)
        setFormData({
          email: '',
          name: '',
          phoneNumber: '',
          password: ''
        })
      }
    } catch (error) {
      toast.error(error.response?.data.message || "Unable to register the user.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-white/50 backdrop-blur-sm">
      <div className="max-w-lg w-full bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl p-10 space-y-8">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight text-center select-none drop-shadow-sm">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Name", name: "name", type: "text" },
            { label: "Phone Number", name: "phoneNumber", type: "text" },
            { label: "Password", name: "password", type: "password" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block mb-2 font-semibold text-gray-900">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={`Enter ${label.toLowerCase()}`}
                className="w-full p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md transition hover:bg-white/40 hover:border-white/40 hover:shadow-lg flex items-center justify-center active:scale-95 active:brightness-90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
          >
            Register
          </button>

          <p className="text-sm text-center text-gray-800 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-gray-900 hover:underline font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
