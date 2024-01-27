import express from 'express';
import documentController from '../controllers/document.js';
const router = express.Router();

router.post('/documents', documentController.createDocument);

// Route to get all documents
router.get('/documents', documentController.getAllDocuments);

// Route to get a single document by ID
router.get('/documents/:id', documentController.getDocumentById);

// Route to update a document by ID
router.put('/documents/:id', documentController.updateDocument);

// Route to delete a document by ID
router.delete('/documents/:id', documentController.deleteDocument);


export default router;