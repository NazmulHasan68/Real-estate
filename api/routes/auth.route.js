import express from 'express'
import {signincontroller, singupController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/signup', singupController)
router.post('/signin', signincontroller)

export default router