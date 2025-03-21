import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
  Header,
  InputBox,
  Button,
  ErrorMessage,
  NavigationBar
} from "../components"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { store } from '../store/userSlice'

function Send() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const id = params.get("id")
  const name = params.get("name")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  const handleClick = async () => {
    setError("")
    try {
      const token = localStorage.getItem("token")
      await axios.patch("https://paymentbackend002.vercel.app/api/v1/account/transfer", {
        to: id,
        amount: parseInt(amount)
      }, {
        headers: {
          authorization: `Bearer ${token}`
        },
      }).then(res => {
        setError(res?.data?.message)
      })

      await axios.get("https://paymentbackend002.vercel.app/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        dispatch(store({ userData: res.data }))
      })
    } catch (err) {
      setError(err.response?.data?.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar />
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="bg-amber-100 rounded-lg shadow-md w-full max-w-md p-6">
          <Header title="Send Money" />
          
          <div className="mt-6 mb-6 flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
            <div className="h-12 w-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
              <span className="text-lg">{name?.[0]?.toUpperCase() || "A"}</span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-amber-800">
                {name}
              </h3>
              <p className="text-sm text-amber-600">Recipient</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <InputBox
              title="Amount in (Rs)"
              placeholder="Enter amount"
              typee="text"
              onChange={e => setAmount(e.target.value)}
            />
            
            <div className="pt-2">
              <Button onClick={handleClick} title="Send Money" />
            </div>
            
            <div className="pt-1">
              <ErrorMessage message={error} />
            </div>
            
            <div className="pt-2 text-center">
              <button 
                onClick={() => navigate('/dashboard')} 
                className="text-amber-700 text-sm hover:underline"
              >
                Cancel and return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Send