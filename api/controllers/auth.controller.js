import User from "../models/user.Model.js";
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utills/error.js'
import jwt from 'jsonwebtoken';

export const singupController = async(req, res, next)=>{
    try {
        const {username , email, password} = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({username, email, password:hashedPassword})
        await newUser.save()
        res.status(200).json({message : "user created successfully"})
        
    } catch (error) {
        next(error)
    }
}


export const signincontroller = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(400, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong password!"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc
        
        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json({ success: true, user: rest });
    } catch (error) {
        next(error);
    }
};