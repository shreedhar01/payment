const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            console.error(`Error: ${error.message}`, error.stack)
            
            // Handle MongoDB specific errors
            if (error.name === 'MongoServerError') {
                if (error.code === 11000) {
                    return res.status(400).json({
                        success: false,
                        error: "Duplicate key error. This record already exists."
                    })
                }
            }
            
            // Handle validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    error: Object.values(error.errors).map(val => val.message).join(', ')
                })
            }
            
            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                return res.status(400).json({
                    success: false,
                    error: "Invalid ID format"
                })
            }
            
            res.status(error.statusCode || 500).json({
                success: false,
                error: error.message || "Internal Server Error"
            })
        }
    }
}

export {
    asyncHandler
}