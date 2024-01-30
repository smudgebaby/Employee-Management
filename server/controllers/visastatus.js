import Visastatus from '../models/visastatus.js';
const {VisaStatus} = Visastatus

const getVisaStatusByUserId = async (req, res) => {
  try {
    const userId = req.userId;
    const userRole = req.userRole;
    const visaStatusRecords = await VisaStatus.find({ user: userId });

    if (!visaStatusRecords) {
      return res.status(404).send('No visa status records found for the given user ID.');
    }

    res.status(200).json(visaStatusRecords);
  } catch (error) {
    res.status(500).send(`Error retrieving visa status records: ${error.message}`);
  }
};

// Create a new Visa Status
const createVisaStatus = async (req, res) => {
  try {
    const newVisaStatus = new VisaStatus(req.body);
    const savedVisaStatus = await newVisaStatus.save();
    res.status(201).json(savedVisaStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing Visa Status
const updateVisaStatus = async (req, res) => {
  try {
    const updatedVisaStatus = await VisaStatus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedVisaStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Visa Status by ID
const getVisaStatus = async (req, res) => {
  try {
    const visaStatus = await VisaStatus.findById(req.params.id);
    if (!visaStatus) return res.status(404).json({ message: 'Visa Status not found' });
    res.status(200).json(visaStatus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export default { getVisaStatusByUserId, createVisaStatus, updateVisaStatus, getVisaStatus };
