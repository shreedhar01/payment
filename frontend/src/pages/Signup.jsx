import React, { useState } from 'react'
import {
  Header,
  InputBox,
  Button,
  ErrorMessage
} from "../components"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
  const [fullName, setFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {
      setIsLoading(true)
      setError("")
      const res = await axios.post("https://paymentbackend002.vercel.app/api/v1/user/signup", {
        fullName,
        userName,
        password
      })

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (error) {
      setError(error?.response?.data?.error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-amber-600 py-4">
          <h1 className="text-center text-2xl font-bold text-white">Create Your Account</h1>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-6">
            <InputBox 
              onChange={e => setFullName(e.target.value)} 
              title="Full Name" 
              typee="text" 
              placeholder="Enter your full name" 
            />
            
            <InputBox 
              onChange={e => setUserName(e.target.value)} 
              title="Email" 
              typee="email" 
              placeholder="you@example.com" 
            />
            
            <InputBox 
              onChange={e => setPassword(e.target.value)} 
              title="Password" 
              typee="password" 
              placeholder="Create a strong password" 
            />
          </div>
          
          <div className="pt-2">
            <button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
          
          <ErrorMessage message={error} />
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Already have an account? 
              <Link to="/signin" className="ml-1 text-amber-600 font-medium hover:text-amber-700">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-amber-800 opacity-70">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}

export default Signup