import express from 'express'
import { singupController } from '../controllers/auth.controller.js'
const router = express.Router()

router.post('/signup', singupController)

export default router