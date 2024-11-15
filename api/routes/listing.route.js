import express from 'express'
import { createlistingController } from '../controllers/listing.controller.js'
import { verifyToken } from '../utills/verifyToken.js'

const router = express.Router()
router.post('/create', verifyToken , createlistingController)

export default router