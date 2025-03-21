import { Router } from "express";
import { asyncHandler } from "../helper.js";
import { authMiddleware } from "../middleware.js";
import { accountModel } from "../db.js";
import mongoose from "mongoose";

const router = Router()

router.get("/balance", authMiddleware, asyncHandler(async (req, res) => {
    const balance = await accountModel.findOne({ userId: req.userId })
    if (!balance) {
        return res.status(404).json({
            error: "account not found"
        })
    }
    res.status(200).json({
        message: "balance fetch successfully",
        balance: balance.balance
    })
}))

router.patch("/transfer", authMiddleware, asyncHandler(async (req, res) => {
    const trackTime = await mongoose.startSession()
    
    trackTime.startTransaction()
    const { to, amount } = req.body
    if (!to || !mongoose.Types.ObjectId.isValid(to)) {
        return res.status(400).json({ error: "Invalid recipient ID" })
    }
    
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Amount must be a positive number" })
    }
    
    if (to.toString() === req.userId.toString()) {
        return res.status(400).json({ error: "Cannot transfer money to yourself" })
    }

    const MAX_TRANSFER_AMOUNT = 1000000
    if (amount > MAX_TRANSFER_AMOUNT) {
        return res.status(400).json({
            error: `Transfer amount exceeds maximum limit of ₹${MAX_TRANSFER_AMOUNT}`
        })
    }

    const isFromExist = await accountModel.findOne({ userId: req.userId }).session(trackTime)

    if (!isFromExist) {
        await trackTime.abortTransaction()
        return res.status(404).json({
            error: "Your account not found"
        })
    }

    if (!isFromExist || isFromExist.balance < amount) {
        trackTime.abortTransaction()
        return res.status(400).json({
            error: `Insufficient balance. You have ₹${isFromExist.balance} but trying to transfer ₹${amount}`
        })
    }

    const isToExist = await accountModel.findOne({ userId: to }).session(trackTime)
    if (!isToExist) {
        trackTime.abortTransaction()
        return res.status(404).json({
            error: "Recipient's account not found"
        })
    }

    const from = await accountModel.findByIdAndUpdate(isFromExist._id, { $inc: { balance: -amount } }).session(trackTime)
    if (!from) {
        trackTime.abortTransaction()
        return res.status(404).json({
            error: "transiction fail"
        })
    }
    const too = await accountModel.findByIdAndUpdate(isToExist._id, { $inc: { balance: amount } }).session(trackTime)
    if (!too) {
        trackTime.abortTransaction()
        return res.status(404).json({
            error: "transiction fail"
        })
    }
    

    trackTime.commitTransaction()
    res.status(200).json({
        message: "balance transfer successfully"
    })
}))


export default router