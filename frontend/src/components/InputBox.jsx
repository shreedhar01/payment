import React from 'react'

function InputBox( {title, placeholder, typee, onChange}) {
  return (
    <div className='flex flex-col p-[4px] m-[6px]'>
        <p className='font-bold text-amber-800 mb-1'> {title} </p>
        <input 
          className='border border-amber-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent' 
          onChange={onChange} 
          placeholder={placeholder}  
          type={typee} 
        />
    </div>
  )
}

export default InputBox