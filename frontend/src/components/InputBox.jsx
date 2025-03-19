import React from 'react'

function InputBox( {title, placeholder, typee, onChange}) {
  return (
    <div className='flex flex-col p-[4px] m-[6px]'>
        <p className=' font-bold'> {title} </p>
        <input className=' border rounded p-[2px]' onChange={onChange} placeholder={placeholder}  type={typee} />
    </div>
  )
}

export default InputBox