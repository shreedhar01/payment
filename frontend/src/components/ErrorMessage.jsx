import React from 'react'

function ErrorMessage({ message }) {
    return (
        <div className=' flex justify-center text-red-500' >
            <p>
                {message}
            </p>
        </div>
    )
}

export default ErrorMessage