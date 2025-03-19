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
  const navigate = useNavigate()

  const handleSignup = async () => {
    try {

      setError("")
      const res = await axios.post("http://localhost:8000/api/v1/user/signup", {
        fullName,
        userName,
        password
      })

      localStorage.setItem("token", res.data.token)
      navigate("/dashboard")
    } catch (error) {
      setError(error?.response?.data?.error)
    }

  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-amber-100 w-full max-w-md p-6 rounded-lg shadow-md '>
        <Header title="Signup" />
        <InputBox onChange={e => setFullName(e.target.value)} title="Full Name" typee="text" placeholder="ram magar" />
        <InputBox onChange={e => setUserName(e.target.value)} title="UserName" typee="email" placeholder="user@gmail.com" />
        <InputBox onChange={e => setPassword(e.target.value)} title="Password" typee="password" placeholder="password" />
        <Button onClick={handleSignup} title="Signup" />
        <ErrorMessage message={error} />
        <div className='flex gap-1' >
          <p>Already Have a account? </p>
          <Link className=' underline' to="/signin">
            Signin
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Signup