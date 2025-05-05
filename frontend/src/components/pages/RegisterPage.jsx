/**
 * @file RegisterPage.jsx
 * 
 * This file contains the RegisterPage component, which is used for user registration.
 * 
 * @author teshan_kalhara
 * 
 * @created 5/5/2025
 * @updated 5/5/2025
 */
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../service/ApiService"

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: ''
    })

    const [message, setMessage] = useState(null)
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
                setMessage("User Successfully Registered")
                setTimeout(() => {
                    navigate("/login")
                }, 4000)
                // Optionally reset the form
                setFormData({
                    email: '',
                    name: '',
                    phoneNumber: '',
                    password: ''
                })
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to register the user.")
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-6">Register</h2>
            {message && <p className="text-center text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700"
                >
                    Register
                </button>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-orange-600 hover:text-orange-700">Login</a>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage
