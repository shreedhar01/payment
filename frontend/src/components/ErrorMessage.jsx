import React from 'react'

function ErrorMessage({ message }) {
    if (!message) return null;
    
    return (
        <div className='flex justify-center items-center text-red-600 bg-red-50 rounded-lg p-2 mt-2 border border-red-200' >
            <p className="text-sm font-medium">
                {message}
            </p>
        </div>
    )
}

export default ErrorMessage