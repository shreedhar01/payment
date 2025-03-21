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
            error: "any of the field is empty"
        })
    }

    const isUserExist = await userModel.findOne({ userName: userName })
    if (isUserExist) {
        return res.status(400).json({
            error: " user already exist"
        })
    }

    const user = await userModel.create({
        userName: userName,
        fullName: fullName,
        password: password
    })
    if (!user) {
        return res.status(500).json({
            error: "user not created"
        })
    }
    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET)
    if (!token) {
        return res.status(400).json({
            error: "token not generated"
        })
    }

    const balanceAdded = await accountModel.create({
        userId: user._id,
        balance: Math.floor(Math.random() * 10000) + 1
    })
    if (!balanceAdded) {
        return res.status(200).json({
            error: "balance added unsuccess"
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
            error: "pass valid string"
        })
    }

    const user = await userModel.findOne({
        userName: userName,
        password: password
    })
    if (!user) {
        return res.status(404).json({
            error: "user not found" // Changed from message to error for consistency
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

router.get("/", authMiddleware, asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.userId).select("-password");
    const balance = await accountModel.findOne({ userId: user._id })

    if (!user) {
        return res.status(404).json({
            error: "user not found"
        });
    }

    return res.status(200).json({
        message: "user details fetched successfully",
        data: user,
        balance: balance
    });
}));

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
        return res.status(400).json({
            error: error.message || "At least one field must have a non-empty value"
        })
    }

    const isUserExist = await userModel.findById(req.userId)
    if (!isUserExist) {
        return res.status(404).json({
            error: "user doesn't exist"
        })
    }

    const updateData = await userModel.findByIdAndUpdate(req.userId, {
        $set: data
    }, { new: true })
    if (!updateData) {
        return res.status(500).json({
            error: "update unsuccessful"
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
            error: "provide valid input"
        })
    }

    // Sanitize filter input for regex to prevent ReDoS attacks
    const sanitizedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const filterUser = await userModel.aggregate([
        {
            $match: {
                fullName: { $regex: sanitizedFilter, $options: "i" },
                _id: { $ne: mongoose.Types.ObjectId(req.userId) }
            }
        },
        {
            $project: {
                _id: 1,
                fullName: 1
            }
        },
        { $limit: 10 }
    ])

    if (!filterUser.length) {
        return res.status(404).json({
            error: "user not found"
        })
    }

    return res.status(200).json({
        message: "everything work successfully",
        data: filterUser
    })
}))

export default router