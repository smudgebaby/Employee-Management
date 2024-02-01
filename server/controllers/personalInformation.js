import personalInformation from '../models/personalInformation.js';
import userModel from '../models/user.js';
const {User} = userModel;
const {PersonalInformation} = personalInformation

const createPersonalInformation = async (req, res) => {
  
  try {
    const id = req.params.id;

    if(await User.findOne({ id })) {
      return res.status(400).json({ message: 'Personal Information already exists' })
    } else {
      const personalInfoData = req.body;

      const newPersonalInformation = await PersonalInformation.create({ ...personalInfoData, id });

      res.status(200).json({ message: 'Personal information created successfully', data: newPersonalInformation });

    }

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const updatePersonalInformation = async (req, res) => {
  
  try {
    const id = req.params.id;

    const personalInfoData = req.body;

    const updatedInformation = await PersonalInformation.findOneAndUpdate({ id }, personalInfoData, { new: true });

    if(!updatedInformation) {
      return res.status(404).json({ message: 'Personal information not found' });
    }

    res.status(200).json({ message: 'Personal information updated successfully', data: updatedInformation });

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const getPersonalInformation = async (req, res) => {
  
  try {
    const id = req.params.id;

    const employeeInformation = await PersonalInformation.findOne({ id });

    if(!employeeInformation) {
      return res.status(404).json({ message: 'EmployeePages personal information not found' })
    }

    res.status(200).json(employeeInformation);

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const getAllPersonalInformation = async (req, res) => {
  try {
    const allPersonalInformation = await PersonalInformation.find();

    if (!allPersonalInformation || allPersonalInformation.length === 0) {
      return res.status(404).json({ message: 'No personal information records found' });
    }

    res.status(200).json({ data: allPersonalInformation });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'get Server Error' });
  }
};



export default {
  createPersonalInformation,
  updatePersonalInformation,
  getPersonalInformation,
  getAllPersonalInformation,
}
