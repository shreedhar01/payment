import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const { autherization } = req.header

    if (!autherization || !autherization.startwith("Bearer ")) {
        return res.status(400).json({
            message: "not valid autherization"
        })
    }
    const token = autherization.split(" ")[1]

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