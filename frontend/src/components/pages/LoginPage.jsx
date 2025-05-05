import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import ApiService from "../../service/ApiService"

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await ApiService.loginUser(formData);
            if (response.status === 200) {
                setMessage("User Successfully Logged in")
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)
                setTimeout(() => {
                    navigate("/profile")
                }, 4000)
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Unable to login")
        }
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-6 border border-gray-300 rounded-lg shadow-sm bg-white">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            {message && <p className="text-center text-green-600 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-orange-500"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-orange-500"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
                <p className="text-sm text-center mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-orange-500 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
