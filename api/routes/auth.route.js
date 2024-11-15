import express from "express";
import upload from "../utills/multer.js";
import {
  googleController,
  signinController,
  signupController,
  updateProfileController,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.post("/google", googleController);
router.put("/updateProfile", upload.single("image"), updateProfileController);

export default router;
