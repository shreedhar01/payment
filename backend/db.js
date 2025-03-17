import mongoose,{Schema} from "mongoose";

mongoose.connect("mongodb+srv://orderingf01:Smhn8HU4WBZvHvGu@foodordering.rkpi5.mongodb.net")

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String
})

const userModel = mongoose.model("User",userSchema)

export {
    userModel
}