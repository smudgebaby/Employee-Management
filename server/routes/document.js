import express from 'express';
import documentController from '../controllers/document.js';
import {authenticateToken} from '../middleware/auth.js';

const router = express.Router();

router.post('/', documentController.createDocument);

router.get('/getByUserId', authenticateToken, documentController.findDocumentsByUserId);
// Route to get all documents
router.get('/', documentController.getAllDocuments);

// Route to get a single document by ID
router.get('/:id', documentController.getDocumentById);

// Route to update a document by ID
router.put('/:id', documentController.updateDocument);

// Route to delete a document by ID
router.delete('/:id', documentController.deleteDocument);



export default router;