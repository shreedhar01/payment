import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Header,
  InputBox,
  Button,
  ErrorMessage,
  NavigationBar
} from "../components"
import axios from 'axios'

function Send() {
  const [params] = useSearchParams()
  const id = params.get("id")
  const name = params.get("name")
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")

  const handleClick = async () => {
    setError("")
    try {
      const token = localStorage.getItem("token")
      await axios.patch("http://localhost:8000/api/v1/account/transfer", {
        to: id,
        amount: parseInt(amount)
      }, {
        headers: {
          authorization: `Bearer ${token}`
        },
      }).then(res => {
        setError(res?.data?.message)
        console.log(res);

      })
    } catch (err) {
      setError(err.response?.data?.error)
    }
  }

  return (
    <>
      <NavigationBar />
      <div className=' flex justify-center items-center'>
        <div className=' bg-amber-100 gap-3'>
          <Header title="Send Money" />
          <div className=' flex gap-2 mt-10'>
            <div className='peer h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-amber-700'>
              <span>{name?.[0]}</span>
            </div>
            <h1 className='flex justify-center items-center'>{name}</h1>
          </div>
          <InputBox
            title="Amount in (Rs)"
            placeholder="Enter amount"
            typee="text"
            onChange={e => setAmount(e.target.value)}
          />
          <Button onClick={handleClick} title="Send" />
          <ErrorMessage message={error} />
        </div>
      </div>
    </>
  )
}

export default Send