import mongoose,{Schema} from "mongoose";


mongoose.connect(process.env.MONGODB_URI)

const userSchema = new Schema({
    fullName: String,
    userName: String,
    password: String
})

const accountSchema = new Schema({
    userId : {
        type: new Schema.Types.ObjectId,
        ref : "User",
        repuired: true
    },
    balance : {
        type: Number,
        required: true
    }
})

const userModel = mongoose.model("User",userSchema)
const accountModel = mongoose.model("Account",accountSchema)

export {
    userModel,
    accountModel
}