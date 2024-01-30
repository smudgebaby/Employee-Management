import express from 'express';
import personalInformationController from '../controllers/personalInformation.js';
const {
  createPersonalInformation, 
  updatePersonalInformation, 
  getPersonalInformation,
  getAllPersonalInformation
} = personalInformationController

const router = express.Router();

router.post('/create/:id', createPersonalInformation);

router.put('/update/:id', updatePersonalInformation);

router.get('/get/:id', getPersonalInformation);

router.get('/getAll', getAllPersonalInformation);

export default router;