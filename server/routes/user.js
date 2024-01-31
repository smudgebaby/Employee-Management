import express from 'express';
import {checkAuthentication} from '../middleware/auth.js';
import userController from '../controllers/user.js';
const {getAllEmployees, getUsersWithPendingDocuments, updateUserById, getUserById, logout, register, login, generateRegistrationTokenAndSendEmail} = userController

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/generate-registration-token', generateRegistrationTokenAndSendEmail);

router.get('/auth-status', checkAuthentication);

router.get('/getById/:id', getUserById);

router.get('/getAllInProgress', getUsersWithPendingDocuments);

router.get('/getAllEmployees', getAllEmployees);

router.post('/updateById/:id', updateUserById);


export default router;