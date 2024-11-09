import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
try {
    mongoose.connect(process.env.MONGO)
    console.log("Database is connected successfully!");
} catch (error) {
    console.log("Database is not connected");
}


const app = express()
app.listen(3000, ()=>{
    console.log('Server is running on port 3000!');
})