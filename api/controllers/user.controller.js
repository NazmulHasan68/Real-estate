import User from "../models/user.Model.js";
import { errorHandler } from "../utills/error.js";
import cloudinary from 'cloudinary'; 
import Listiing from '../models/listing.model.js'

export const userController = async(req, res)=>{
    try {
        res.json({
           message : "hello world"
        })
    } catch (error) {
       console.log(error);
        
    }
}

export const userdeleteController = async(req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'Only delete your own account!'))
    }
    try {
        const data = await User.findById(req.params.id)
        try {
            const publicId = data.avatar.split('/').pop().split('.')[0];
            const deleteResult = await cloudinary.uploader.destroy(publicId)
        } catch (error) {
            if(!deleteResult) console.log("failure to deleted image");
        }
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie('access_token', { httpOnly: true, path: '/' });
        res.status(200).json({message : "User has been deleted!"})
    } catch (error) {
      next()  
    }
}


export const userlogoutController = async(req, res, next)=>{
    if(req.user.id !== req.params.id){
        return next(errorHandler(401, 'Only delete your own account!'))
    }
    try {
        res.clearCookie('access_token', { httpOnly: true, path: '/' });
        res.status(200).json({message : "User logout suucessfully"})
    } catch (error) {
      next()  
    }
}


export const getuserlistingController = async(req, res, next) =>{
    if(req.user.id == req.params.id){
        try {
            const listngs = await Listiing.find({userRef:req.params.id})
            res.status(200).json(listngs)
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401, "You can only view your own listing"))
    }
}



export const getUser = async(req, res, next) =>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return next(errorHandler(404, "User not found!"))

        const {password:pass, ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

