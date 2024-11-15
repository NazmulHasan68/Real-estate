import User from "../models/user.Model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utills/error.js';
import cloudinary from "../utills/cloudinary.js";
import jwt from 'jsonwebtoken';



// User Signup
export const signupController = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) return next(errorHandler(400, "Email already registered"));

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

// User Sign-in
export const signinController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found!'));

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Incorrect password"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: _, ...userWithoutPassword } = validUser._doc;

        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json({ success: true, user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

// Google Authentication
export const googleController = async (req, res, next) => {
    try {
        const { email, name, photo } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

            user = new User({
                username: name.replace(/\s+/g, '').toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: hashedPassword,
                avatar: photo
            });
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: _, ...userWithoutPassword } = user._doc;

        res.cookie('access_token', token, { httpOnly: true })
           .status(200)
           .json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
};






export const updateProfileController = async (req, res, next) => {
    const { username, email, password, avatar } = req.body;
    
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Update user details
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcryptjs.hash(password, 10);
        if(avatar) user.avatar = avatar


        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        next(error); // Pass error to the error handling middleware
    }
};
