import React from 'react'
import { Link } from "react-router-dom"

function NavigationBar({ user }) {
  return (
    <>
      <nav className='flex justify-between items-center bg-amber-100 relative'>
        <Link to="/dashboard" >
          <h1 className=' font-bold text-2xl' >Payment App</h1>
        </Link>

        <div className='flex justify-center items-center gap-2'>
          <p className=' font-bold'>Hello,{user?.data?.fullName}</p>
          <div className='peer h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-amber-700'>
            <span>{user?.data?.fullName?.[0] || "a"}</span>
          </div>
          <div className=' hidden peer-hover:block absolute top-full right-0 mt-1 z-10'>
            <div className=' bg-amber-500 p-3 rounded shadow-md'>
              <h3>FullName: {user?.data?.fullName} </h3>
              <h3>Email: {user?.data?.userName} </h3>
            </div>
          </div>
        </div>
      </nav>

    </>

  )
}

export default NavigationBar   