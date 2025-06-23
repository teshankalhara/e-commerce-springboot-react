/**
 * @file AdminPage.jsx
 * 
 * This file contains the AdminPage component which is responsible for rendering the admin dashboard.
 * 
 * @author teshan_kalhara
 * @created 6/3/2025
 * @updated 6/3/2025
 */

import { useNavigate } from "react-router-dom"
import { Grid, Package, ShoppingCart } from "lucide-react"

const AdminPage = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-20 px-8 bg-white/50 backdrop-blur-sm">
            <div className="bg-white/30 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-xl max-w-lg w-full p-12 flex flex-col items-center space-y-8">
                <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight select-none drop-shadow-sm font-sans">
                    Welcome Admin
                </h1>

                {[
                    { label: 'Categories', icon: Grid, path: 'categories' },
                    { label: 'Products', icon: Package, path: 'products' },
                    { label: 'Orders', icon: ShoppingCart, path: 'orders' }
                ].map(({ label, icon: Icon, path }) => (
                    <button
                        key={path}
                        onClick={() => navigate(`/admin/${path}`)}
                        className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold text-lg shadow-md
              transition
              hover:bg-white/40 hover:border-white/40 hover:shadow-lg
              flex items-center justify-center gap-3
              active:scale-95 active:brightness-90
              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                        <Icon size={24} className="text-gray-900" />
                        Manage {label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default AdminPage
