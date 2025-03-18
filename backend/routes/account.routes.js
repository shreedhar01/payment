import { Router } from "express";
import { asyncHandler } from "../helper.js";
import { authMiddleware } from "../middleware.js";
import { userModel, accountModel } from "../db.js";
import mongoose from "mongoose";

const router = Router()

router.get("/balance", authMiddleware, asyncHandler(async (req, res) => {
    const balance = await accountModel.findOne({ userId: req.userId })
    if (!balance) {
        return res.status(404).json({
            message: "account not found"
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

    const isFromExist = await accountModel.findOne({ userId: req.userId }).session(trackTime)
    if (!isFromExist || isFromExist.balance < amount) {
        trackTime.abortTransaction()
        return res.status(400).json({
            message: "not enough balance"
        })
    }

    const isToExist = await accountModel.findOne({ userId: to }).session(trackTime)
    if (!isToExist) {
        trackTime.abortTransaction()
        return res.status(404).json({
            message: "user not found"
        })
    }

    const from = await accountModel.findByIdAndUpdate(isFromExist._id, { $inc: { balance: -amount } }).session(trackTime)
    if (!from) {
        trackTime.abortTransaction()
        return res.status(404).json({
            message: "transiction fail"
        })
    }
    const too = await accountModel.findByIdAndUpdate(isToExist._id, { $inc: { balance: amount } }).session(trackTime)
    if (!too) {
        trackTime.abortTransaction()
        return res.status(404).json({
            message: "transiction fail"
        })
    }
    

    trackTime.commitTransaction()
    res.status(200).json({
        message: "balance transfer successfully"
    })
}))


export default router