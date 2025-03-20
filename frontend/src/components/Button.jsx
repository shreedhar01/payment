import React from 'react'

function Button({onClick, title}) {
  return (
    <div className='p-[4px] m-[6px] flex justify-center items-center bg-amber-600 hover:bg-amber-500 rounded '>
      <button onClick={onClick} className='text-white font-medium' > {title} </button>
    </div>
  )
}

export default Button