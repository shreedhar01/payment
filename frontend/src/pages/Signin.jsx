import React, { useState } from 'react'
import {
  Header,
  InputBox,
  Button,
  ErrorMessage
} from "../components/index.js"
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigator = useNavigate()

  const handleClick = async () => {
    try {
      setIsLoading(true)
      setError("")
      const res = await axios.post("https://paymentbackend002.vercel.app/api/v1/user/signin", {
        userName: email,
        password
      })
      localStorage.setItem("token", res.data.token)
      navigator("/dashboard")
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
          <h1 className="text-center text-2xl font-bold text-white">Welcome Back</h1>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-6">
            <InputBox 
              onChange={e => setEmail(e.target.value)} 
              title="Email" 
              typee="email" 
              placeholder="you@example.com" 
            />
            
            <InputBox 
              onChange={e => setPassword(e.target.value)} 
              title="Password" 
              typee="password" 
              placeholder="Enter your password" 
            />
          </div>
          
          <div className="pt-2">
            <button
              onClick={handleClick}
              disabled={isLoading}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
          
          <ErrorMessage message={error} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Don't have an account?</p>
            <Link to="/signup" className="block mt-2 text-amber-600 font-medium hover:text-amber-700 transition-colors">
              Create a new account
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-amber-800 opacity-70">
        <p>Secure login • Protected by industry standard encryption</p>
      </div>
    </div>
  )
}

export default Signin