import React from 'react'

function Button({onClick, title}) {
  return (
    <div className=' flex justify-center items-center'>
      <button onClick={onClick} className=' bg-green-400 hover:bg-green-200 rounded' > {title} </button>
    </div>
  )
}

export default Button