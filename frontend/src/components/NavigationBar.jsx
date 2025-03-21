import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"

function NavigationBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector(state => state.user.userData)
  
  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-50 to-amber-100 shadow-md px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="bg-amber-600 text-white h-8 w-8 rounded-full flex items-center justify-center">
            <span className="font-bold">P</span>
          </div>
          <h1 className="font-bold text-2xl text-amber-800 hidden sm:block">Payment App</h1>
        </Link>
        
        {/* User Section */}
        <div className="flex items-center gap-3">
          <p className="font-medium text-amber-800 hidden sm:block">
            Hello, <span className="font-bold">{user?.data?.fullName || "User"}</span>
          </p>
          
          {/* Profile Avatar */}
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm border-2 border-amber-200 transition-all hover:shadow-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-50"
            >
              <span className="text-lg">{user?.data?.fullName?.[0]?.toUpperCase() || "U"}</span>
            </button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10 transition-opacity duration-200 ease-in-out">
                <div className="py-2 px-3 border-b border-amber-100">
                  <p className="text-sm text-amber-600">Signed in as</p>
                  <p className="text-sm font-medium text-amber-900 truncate">{user?.data?.userName || "user@example.com"}</p>
                </div>
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-amber-800">
                    <p className="font-semibold">Name:</p>
                    <p>{user?.data?.fullName || "User"}</p>
                  </div>
                  <div className="px-4 py-2 text-sm text-amber-800">
                    <p className="font-semibold">Balance:</p>
                    <p>₹ {user?.balance?.balance || "0"}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-amber-700 hover:bg-amber-50">
                    Dashboard
                  </Link>
                  <button onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                  }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar