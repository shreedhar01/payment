import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className=' flex justify-between'>LandingPage
      <div className=' flex gap-2 m-[6px]'>
        <Link className=' underline' to="/signin" >
        Signin
        </Link>
        <Link className=' underline' to="/signup" >
        Signup
        </Link>
      </div>
    </div>
  )
}

export default LandingPage