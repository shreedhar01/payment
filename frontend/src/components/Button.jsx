import React from 'react'

function Button({onClick, title}) {
  return (
    <div className='p-[4px] m-[6px] flex justify-center items-center bg-green-400 hover:bg-green-200 rounded '>
      <button onClick={onClick} className='' > {title} </button>
    </div>
  )
}

export default Button