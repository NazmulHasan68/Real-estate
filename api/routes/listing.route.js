import express from 'express'
import { createlistingController, deletelistingController } from '../controllers/listing.controller.js'
import { verifyToken } from '../utills/verifyToken.js'

const router = express.Router()
router.post('/create', verifyToken , createlistingController)
router.delete('/delete/:id', verifyToken , deletelistingController)

export default router