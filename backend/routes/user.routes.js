import { Router } from "express"
import zod from "zod"
import { userModel } from "../db.js"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config.js"

const router = Router()

const signupSchema = zod.object({
    userName: zod.string().email(),
    fullName: zod.string(),
    password: zod.string()
})

const signinSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { userName, password, fullName } = req.body

    const { success } = signupSchema.safeParse(req.body)
    console.log(signupSchema.safeParse(req.body));

    if (!success) {
        return res.status(400).json({
            message: "any of the field is empty"
        })
    }

    const isUserExist = await userModel.findOne({ userName: userName })
    if (isUserExist) {
        return res.status(400).json({
            message: " user already exist"
        })
    }

    const user = await userModel.create({
        userName: userName,
        fullName: fullName,
        password: password
    })
    if (!user) {
        return res.status(500).json({
            message: "user not created"
        })
    }
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)

    return res.status(200).json({
        message: "user created successfully",
        token: token
    })
})

router.get("/signin", async (req, res) => {
    const { userName, password } = req.body
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(400).json({
            message: "pass valid string"
        })
    }

    const user = await userModel.findOne({
        userName: userName,
        password: password
    })
    if (!user) {
        return res.status(404).json({
            message: " user not found "
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET)
    res.status(200).json({
        message: "login successfully",
        token: token
    })
})

export default router