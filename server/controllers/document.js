import document from '../models/document.js';
import user from '../models/user.js';
const {Document} = document;
const {User} = user;

// Create a new document
const createDocument = async (req, res) => {
    try {
        const { user, type, fileURL, status } = req.body;
        // Ensure the user exists
        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Create and save the new document
        const newDocument = new Document({ user, type, fileURL, status });
        await newDocument.save();

        // Optionally, push the document into the user's documents array if not automatically populated
        existingUser.documents.push(newDocument);
        await existingUser.save();

        res.status(201).json(newDocument);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Function to find documents by userId
const findDocumentsByUserId = async (req, res) => {
    const userId = req.userId; // Assuming userId is already set on the req object by previous middleware
    console.log(userId)
    if (!userId) {
        return res.status(400).json({ message: 'User ID not provided' });
    }
    try {
        // Find documents associated with the userId
        const documents = await Document.find({ user: userId }).exec();
        if (!documents || documents.length === 0) {
            return res.status(404).json({ message: 'No documents found for the specified user' });
        }
        const documentsByType = documents.reduce((acc, doc) => {
            // Assuming that if multiple documents of the same type exist, you want the latest one
            // This code can be adjusted based on how you determine which document to keep
            acc[doc.type] = doc;
            console.log(acc);
            return acc;
        }, {});

        res.status(200).json(documentsByType);

    } catch (error) {
        console.error('Error fetching document IDs:', error);
        res.status(500).send(error.message);
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
    findDocumentsByUserId
};