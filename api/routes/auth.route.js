import express from 'express'
import {googlecontroller, signincontroller, singupController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/signup', singupController)
router.post('/signin', signincontroller)
router.post('/google', googlecontroller)

export default router