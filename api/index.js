import express, { json } from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

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

//allow cookiz 
app.use(cookieParser())


app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
})

//api 
import userRouter from './routes/user.route.js'
import userAuthRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
app.use('/api/user',userRouter)
app.use('/api/auth',userAuthRouter )
app.use('/api/listing',listingRouter )

//middlware
app.use((err, req, res, next)=>{
    const statusCode = err.statuCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})