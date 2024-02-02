import express from 'express';
import {checkAuthentication} from '../middleware/auth.js';
import userController from '../controllers/user.js';
const {generateNotificationEmail, getAllEmployees, getUsersWithPendingDocuments, updateUserById, getUserById, logout, register, login, generateRegistrationTokenAndSendEmail,
    getPendingApplications,
    getRejectedApplications,
    getApprovedApplications,
    approveApplication,
    rejectApplication, getAllEmployeesToken} = userController


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
router.get('/getTokens', getAllEmployeesToken);
router.get('/pending', getPendingApplications);
router.get('/rejected', getRejectedApplications);
router.get('/approved', getApprovedApplications);
router.post('/approve', approveApplication);
router.post('/reject', rejectApplication);
export default router;