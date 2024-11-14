import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique:true,
    },
    email : {
        type : String,
        required : true,
        unique:true,
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type :String,
        default : 'https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png'
    }
},{timestamps:true})

const User = mongoose.model('User', userSchema)

export default User