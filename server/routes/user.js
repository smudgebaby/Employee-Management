import express from 'express';
import {checkAuthentication} from '../middleware/auth.js';
import userController from '../controllers/user.js';
import {authenticateToken} from '../middleware/auth.js';
const {register, login, generateRegistrationTokenAndSendEmail, getUserByUserId} = userController

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/generate-registration-token', generateRegistrationTokenAndSendEmail);

router.get('/auth-status', checkAuthentication);

router.get('/getByUserId', authenticateToken, getUserByUserId);

export default router;