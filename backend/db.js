import mongoose,{Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String
})

const userModel = mongoose.model("User",userSchema)

export {
    userModel
}