import document from '../models/document.js';
const {Document} = document;
// Create a new document
const createDocument = async (req, res) => {
    try {
        const { type, fileURL, status } = req.body;
        const newDocument = new Document({ type, fileURL, status });
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get all documents
const getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a single document by ID
const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a document by ID
const updateDocument = async (req, res) => {
    try {
        const update = req.body;
        const document = await Document.findByIdAndUpdate(req.params.id, update, { new: true });
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Delete a document by ID
const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export default{
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
};