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
  const navigator = useNavigate()

  const handleClick = async () =>{
    try {
      setError("")
      const res = await axios.post("http://localhost:8000/api/v1/user/signin",{
        userName : email,
        password
      })
      localStorage.setItem("token",res.data.token)
      navigator("/dashboard")
    } catch (error) {
      setError(error?.response?.data?.error)
    }
  }

  return (
    <div className=' flex flex-col justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-amber-100 w-full max-w-md p-6 rounded-lg shadow-md'>
        <Header title="Sign In" />
        <InputBox onChange={(e)=>{
          setEmail(e.target.value)
        }} title="Email" typee="email" placeholder="one@one.com" />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }} title="Password" typee="password" placeholder="password" />
        <Button onClick={handleClick} title="Sign In" />
        <ErrorMessage message={error} />
        <div className='flex gap-1' >
          <p>Didn't Have a account? </p>
          <Link className=' underline' to="/signup">
            Create One!
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signin