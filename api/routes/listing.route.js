import express from 'express'
import { createlistingController, deletelistingController, editListingController, getlistingController, getsearchController } from '../controllers/listing.controller.js'
import { verifyToken } from '../utills/verifyToken.js'

const router = express.Router()
router.post('/create', verifyToken , createlistingController)
router.delete('/delete/:id', verifyToken , deletelistingController)
router.put('/edit/:id', verifyToken , editListingController)
router.get('/getlisting/:id', getlistingController)
router.get('/getsearch', getsearchController)

export default router