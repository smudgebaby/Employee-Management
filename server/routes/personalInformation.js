import express from 'express';
import personalInformationController from '../controllers/personalInformation.js';
const {
  createPersonalInformation, 
  updatePersonalInformation, 
  getPersonalInformation
} = personalInformationController

const router = express.Router();

router.post('/:id', createPersonalInformation);

router.put('/:id', updatePersonalInformation);

router.get('/:id', getPersonalInformation);

export default router;