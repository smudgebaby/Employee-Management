import express from 'express';
import {checkAuthentication} from '../middleware/auth.js';
import userController from '../controllers/user.js';
const {generateNotificationEmail, getAllEmployees, getUsersWithPendingDocuments, updateUserById, getUserById, logout, register, login, generateRegistrationTokenAndSendEmail} = userController

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/generate-registration-token', generateRegistrationTokenAndSendEmail);

router.post('/generate-notification', generateNotificationEmail);

router.get('/auth-status', checkAuthentication);

router.get('/getById/:id', getUserById);

router.get('/getAllOrInProgress', getUsersWithPendingDocuments);

router.get('/getAllEmployees', getAllEmployees);

router.post('/updateById/:id', updateUserById);


export default router;