import express from 'express'
import { getuserlistingController, userController, userdeleteController, userlogoutController,  } from '../controllers/user.controller.js';
import { verifyToken } from '../utills/verifyToken.js';

const router = express.Router();

router.get('/test', userController)
router.delete('/delete/:id', verifyToken, userdeleteController)
router.post('/logout/:id', verifyToken, userlogoutController)
router.get('/listing/:id', verifyToken, getuserlistingController)



export default router