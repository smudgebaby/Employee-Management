import express from 'express';
import visaController from '../controllers/visastatus.js'; // Update with the correct path to your controller
const {getVisaStatusByUserId, createVisaStatus, updateVisaStatus, getVisaStatus} = visaController;

const router = express.Router();

router.post('/create', createVisaStatus);

router.post('/update/:id', updateVisaStatus);

router.get('/get/:id', getVisaStatus);

router.get('/getByUserId/:userId', getVisaStatusByUserId);

export default router;
