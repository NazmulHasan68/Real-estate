import User from "../models/user.Model.js";
import { errorHandler } from "../utills/error.js";
import cloudinary from 'cloudinary'; 

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

