import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(400).json({
            message: "not valid authorization"
        })
    }
    const token = authorization.split(" ")[1]

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if (!isVerified.userId) {
        return res.json({
            message: "verification fail"
        })
    }
    req.userId = isVerified.userId
    next()
}

export {
    authMiddleware
}