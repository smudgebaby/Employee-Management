import express from 'express';
import {checkAuthentication} from '../middleware/auth.js';
import userController from '../controllers/user.js';
const {updateUserById, getUserById, logout, register, login, generateRegistrationTokenAndSendEmail,
    getPendingApplications,
    getRejectedApplications,
    getApprovedApplications,
    approveApplication,
    rejectApplication} = userController

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.post('/generate-registration-token', generateRegistrationTokenAndSendEmail);

router.get('/auth-status', checkAuthentication);

router.get('/getById/:id', getUserById);

router.post('/updateById/:id', updateUserById);

router.get('/pending', getPendingApplications);
router.get('/rejected', getRejectedApplications);
router.get('/approved', getApprovedApplications);
router.post('/approve', approveApplication);
router.post('/reject', rejectApplication);
export default router;