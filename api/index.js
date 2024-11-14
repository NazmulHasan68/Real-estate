import express, { json } from 'express'
import mongoose from 'mongoose';

// connected to the mongoDB
import dotenv from 'dotenv'
dotenv.config()
try {
    mongoose.connect(process.env.MONGO)
    console.log("Database is connected successfully!");
} catch (error) {
    console.log("Database is not connected");
}
// connected to the mongoDB


const app = express()
// allow json as inport 
app.use(express.json())


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
})

//api 
import userRouter from './routes/user.route.js'
import userAuthRouter from './routes/auth.route.js'
app.use('/api/user',userRouter)
app.use('/api/auth',userAuthRouter )

//middlware
app.use((err, req, res, next)=>{
    const statuCode = err.statuCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statuCode).json({
        success : false,
        statuCode,
        message
    })
})