import React, { useEffect, useState } from 'react'
import { NavigationBar } from '../components'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState({})
  const [search, setSearch] = useState("")
  const [bulk, setBulk] = useState([])
  const navigator = useNavigate()
  

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.get("http://localhost:8000/api/v1/user/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => {
      setUser(res.data)
    })
      .catch(err => console.error("Error fetching user data:", err))
  }, [])

  useEffect(() => {
    if (!search) return;
    const token = localStorage.getItem("token")
    axios.get("http://localhost:8000/api/v1/user/bulk", {
      headers: {
        authorization: `Bearer ${token}`
      },
      params: {
        filter: search
      }
    }).then(res => {
      setBulk(res?.data?.data)
      console.log(res);
    })
  }, [search])
  return (
    <div>
      <div className='p-[3px]'>

        {/* navigation bar */}
        <NavigationBar user={user} />

        {/* user */}
        <div className='mt-4 p-4 mx-auto'>
          <h1 className='text-xl font-bold text-amber-800'>Your Balance is: Rs{user?.balance?.balance}</h1>
        </div>

        {/* search for users */}
        <div className="px-4 mt-6">
          <div className="relative">
            <input 
              onChange={(e) => setSearch(e.target.value)} 
              className='w-full border border-amber-200 rounded-lg p-3 pl-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent' 
              type="text" 
              placeholder='Search users by name...' 
            />
          </div>
          
          <div className="mt-4 space-y-3">
            {bulk?.length > 0 ? bulk.map(b => (
              <div className='bg-amber-50 border border-amber-200 flex justify-between items-center p-3 rounded-lg shadow-sm' key={b._id}>
                <span className='flex justify-center items-center gap-3'>
                  <div className='h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-amber-700 transition-colors'>
                    <span>{b?.fullName?.[0]?.toUpperCase() || "A"}</span>
                  </div>
                  <span className="font-medium text-amber-800">{b.fullName}</span>
                </span>
                <button 
                  onClick={e => {
                    navigator(`/send?id=${b._id}&name=${b.fullName}`)
                  }} 
                  className="bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700 transition-colors shadow-sm font-medium"
                >
                  Send Money
                </button>
              </div>
            )) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard