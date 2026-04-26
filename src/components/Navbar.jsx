import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { User, LogOut, Package, MapPin, ChevronDown } from 'lucide-react';

export default function Navbar() {
    const { cartItems } = useCart();
    const { toggleCart } = useUI();
    const { isAuthenticated, user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    return (
        <header className="px-10 py-6 bg-black bg-opacity-60 sticky top-0 z-50 backdrop-blur-sm border-b border-white/5">
            <nav className="flex items-center justify-between">
                <NavLink to="/">
                    <img src="/images/logo1.png" className="w-40 md:w-52 cursor-pointer hover:opacity-90 transition" alt="Logo" />
                </NavLink>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => "transition duration-300 " + (isActive ? "text-yellow-400 font-semibold underline" : "hover:text-yellow-400")}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => "transition duration-300 " + (isActive ? "text-yellow-400 font-semibold underline" : "hover:text-yellow-400")}
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/features"
                            className={({ isActive }) => "transition duration-300 " + (isActive ? "text-yellow-400 font-semibold underline" : "hover:text-yellow-400")}
                        >
                            Features
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) => "transition duration-300 " + (isActive ? "text-yellow-400 font-semibold underline" : "hover:text-yellow-400")}
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>

                {/* Icons */}
                <div className="flex items-center gap-6">
                    {/* User Dropdown */}
                    {isAuthenticated ? (
                        <div className="relative group" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
                            <button className="flex items-center gap-2 text-white hover:text-yellow-400 transition">
                                <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                                    {user?.name?.[0]?.toUpperCase() || 'U'}
                                </div>
                                <span className="max-w-[100px] truncate hidden md:block">{user?.name}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {/* Dropdown Menu */}
                            <div className={`absolute right-0 top-full mt-2 w-48 bg-white text-black rounded-lg shadow-xl overflow-hidden transition-all duration-200 origin-top-right transform ${isDropdownOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'}`}>
                                <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                                    <User className="w-4 h-4" /> Profile
                                </NavLink>
                                <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                                    <Package className="w-4 h-4" /> My Orders
                                </NavLink>
                                <NavLink to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition">
                                    <MapPin className="w-4 h-4" /> Addresses
                                </NavLink>
                                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-red-600 transition border-t">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    ) : (
                        <NavLink to="/login" className="text-white hover:text-yellow-400 font-semibold text-sm">
                            Log In / Sign Up
                        </NavLink>
                    )}

                    {/* Cart */}
                    <div className="relative cursor-pointer group p-1" onClick={toggleCart}>
                        <img src="/images/cart.png" alt="Cart" className="w-6 h-6 transition transform group-hover:scale-110" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-[10px] min-w-[1.25rem] h-5 flex items-center justify-center rounded-full font-bold shadow-md border border-black/20">
                                {cartCount}
                            </span>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
