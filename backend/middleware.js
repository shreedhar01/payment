import jwt from "jsonwebtoken"
import JWT_SECRET from "./config"

const authMiddleware = async(req, res, next)=>{
    const {autherization} = req.header

    if(!autherization || !autherization.startwith("Bearer ") ){
        return res.status(400).json({
            message:"not valid autherization"
        })
    }
    const token = autherization.split(" ")[1]


    try {
        const isVerified = jwt.verify(token,JWT_SECRET)
        if(isVerified._id){
            req.userId = isVerified._id
            next()
        }else{
            return res.json({
                message: "verification fail"
            })
        }
    } catch (error) {
        return res.json({
            message:"something went worong",
            error: error
        })
    }
}