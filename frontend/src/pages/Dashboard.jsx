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
      <div className=' p-[3px]'>

        {/* navigation bar */}
        <NavigationBar user={user} />

        {/* user */}
        <div className='"mt-4 p-4 mx-auto '>
          <h1 className='text-xl font-bold text-amber-800'>Your Balance is: Rs{user?.balance?.balance}</h1>
        </div>

        {/* search for users */}
        <div>
          <input  onChange={(e) => setSearch(e.target.value)} className=' border ml-2 mb-2' type="text" placeholder='search user' />
          {/* learning of the day first i use bulk?.length && bulk.map(...) mystery zero appear reason no length it mean false. So i use ternary operator  */}
          {bulk?.length > 0 ? bulk.map(b => (
            <div className=' max-h-100 bg-green-400 flex justify-between m-[6px] rounded' key={b._id}>
              <span className=' flex justify-center items-center gap-1'>
                <div className='peer h-10 w-10 bg-amber-600 rounded-full flex items-center justify-center text-white font-medium cursor-pointer hover:bg-amber-700'>
                  <span>{b?.fullName?.[0] || "a"}</span>
                </div>
                {b.fullName}</span>
              <button onClick={e=>{
                navigator(`/send?id=${b._id}&name=${b.fullName}`)
              }} className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700">
                Send Money
              </button>
            </div>
          )
          ): null}
        </div>
      </div>
    </div>
  )
}

export default Dashboard