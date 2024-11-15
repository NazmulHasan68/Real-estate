import express from 'express'
import { userController, userdeleteController,  } from '../controllers/user.controller.js';
import { verifyToken } from '../utills/verifyToken.js';

const router = express.Router();

router.get('/test', userController)
router.delete('/delete/:id', verifyToken, userdeleteController)



export default router