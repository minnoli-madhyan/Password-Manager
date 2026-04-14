import express from 'express';
import { registerUser, loginUser, verifyOtp, getProfile, updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOtp);
router.get("/get-profile", authMiddleware, getProfile)
router.post('/update-profile', upload.single('image'), authMiddleware, updateProfile);

export default router;