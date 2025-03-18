import { Router } from "express"
import zod from "zod"
import {
    userModel,
    accountModel
} from "../db.js"
import jwt from "jsonwebtoken"
import { authMiddleware } from "../middleware.js"
import { asyncHandler } from "../helper.js"


const router = Router()

const signupSchema = zod.object({
    userName: zod.string().email(),
    fullName: zod.string(),
    password: zod.string().min(8, { message: "password must be at least 8 character" })
})

router.post("/signup", asyncHandler(async (req, res) => {
    const { userName, password, fullName } = req.body

    const { success } = signupSchema.safeParse(req.body)

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
    }, process.env.JWT_SECRET)
    if (!token) {
        return res.status(400).json({
            message: "token not generated"
        })
    }

    const balanceAdded = await accountModel.create({
        userId : user._id,
        balance: Math.floor(Math.random() * 10000) + 1
    })
    if(!balanceAdded){
        return res.status(200).json({
            message : "balance added unsuccess"
        })
    }

    return res.status(200).json({
        message: "user created successfully",
        token: token
    })
}))

const signinSchema = zod.object({
    userName: zod.string().email(),
    password: zod.string().min(8, { message: "password must be at least 8 character" })
})

router.post("/signin", asyncHandler(async (req, res) => {
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
    }, process.env.JWT_SECRET)
    res.status(200).json({
        message: "login successfully",
        token: token
    })
}))

const updateSchema = zod.object({
    userName: zod.string().email().optional(),
    fullName: zod.string().optional(),
    password: zod.string().min(8, { message: "password must be at least 8 character" }).optional(),
}).refine(data => {
    return Object.values(data).some(
        value => value !== undefined && value !== null && value.trim() !== ''
    )
}, { message: "At least one field must have value" })

router.patch("/", authMiddleware, asyncHandler(async (req, res) => {
    const { success, data, error } = updateSchema.safeParse(req?.body)

    if (!success) {
        return res.json({
            message: error.message || "At least one field must have a non-empty value"
        })
    }

    const isUserExist = await userModel.findById(req.userId)
    if (!isUserExist) {
        return res.json({
            message: "user doesnt exist"
        })
    }

    const updateData = await userModel.findByIdAndUpdate(req.userId, {
        $set: data
    }, { new: true })
    if (!updateData) {
        return res.json({
            message: "update unsuccess"
        })
    }
    
    return res.status(200).json({
        message: "User updated successfully"
    });
}))


router.get("/bulk", authMiddleware, asyncHandler(async (req, res) => {
    const { filter } = req.query
    if (!filter) {
        return res.status(400).json({
            message: "provide valid input"
        })
    }

    const filterUser = await userModel.aggregate([
        {
            $match: { fullName: { $regex: filter, $options: "i" } }
        },
        {
            $project: {
                _id: 1,
                fullName: 1
            }
        }
    ])

    if (!filterUser.length) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        message: "everything work successfully",
        data: filterUser
    })
}))

export default router