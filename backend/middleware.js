import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).json({
            error: "Authentication required. Please provide a valid token."
        })
    }
    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: "Token is missing" })
    }

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if (!isVerified.userId) {
        return res.json({
            error: "invalid token"
        })
    }
    req.userId = isVerified.userId
    next()
}

export {
    authMiddleware
}