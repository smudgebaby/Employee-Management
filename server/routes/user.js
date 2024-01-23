import express from 'express';
import userController from '../controllers/user.js';
const {register, login, generateRegistrationTokenAndSendEmail} = userController

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/generate-registration-token', generateRegistrationTokenAndSendEmail);

export default router;