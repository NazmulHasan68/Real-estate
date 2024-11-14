import User from "../models/user.Model.js";
import bcryptjs from 'bcryptjs'


export const singupController = async(req, res)=>{
    try {
        const {username , email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({username, email, password:hashedPassword})
        await newUser.save()
        res.status(200).json({message : "user created successfully"})
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}