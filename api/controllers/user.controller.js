import User from "../models/user.Model.js";

export const userController = async(req, res)=>{
    try {
        res.json({
           message : "hello world"
        })
    } catch (error) {
       console.log(error);
        
    }
}
