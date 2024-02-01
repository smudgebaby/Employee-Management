import user from '../models/user.js';
import {
  generateLoginToken,
  generateRegistrationToken,
  sendEmail,
  sendNotification,
} from '../middleware/auth.js';
const {User} = user;

const register = async (req, res) => {
  
  try {
    const { username, email, password } = req.body
    
    if(await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    if(await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    
    const user = new User({ username, email, password});

    await user.save();
    const documentTypes = ['Driver License', 'Work Authorization'];
        for (const type of documentTypes) {
            const newDocument = new Document({
                user: newUser._id,
                type: type,
                status: 'Not Submit' // Assuming 'Not Submit' is the initial status
            });
            await newDocument.save();

            // Optionally, link these document IDs back to the user, if your user schema stores document IDs
            newUser.documents.push(newDocument._id);
        }
        await newUser.save();
        
    res.status(201).json({ message: 'User created'});

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}

const login = async (req, res) => {

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ code: 400, message: 'Invalid email'})
    }

    if(user.password !== password) {
      return res.status(400).json({ code: 400, message: 'Password not match'})
    }

    const token = generateLoginToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3600000 // expires in 1 hour
    });

    const role = user.role === 'employee' ? 1 : 2;
    res.status(200).json({ code: 200, message: 'Sign in successful', role })

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ code: 500, message: 'Server Error'});
  }
}

const logout = async (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).send('Logged out');
}

const generateRegistrationTokenAndSendEmail = async (req, res) => {

  try {
    const { email } = req.body;

    if (!email ) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const registrationToken = generateRegistrationToken();

    await sendEmail(email, registrationToken);

    res.status(200).json({ message: 'Registration token sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const generateNotificationEmail = async (req, res) => {

  try {
    const { email, type } = req.body;

    if (!email ) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    await sendNotification(email, type);

    res.status(200).json({ message: 'Notification sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    .populate('visaStatus')
    .populate('documents')
    .populate('personalInformation');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { personalInformationId, documentIds, visaStatusId, onboardingStatus } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (personalInformationId) user.personalInformation = personalInformationId;
    if (documentIds) user.documents = documentIds;
    if (visaStatusId) user.visaStatus = visaStatusId;
    if (onboardingStatus) {
      user.onboardingStatus.status = onboardingStatus.status || user.onboardingStatus.status;
      user.onboardingStatus.feedback = onboardingStatus.feedback || user.onboardingStatus.feedback;
    }

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPendingApplications = async (req, res) => {
  console.log('pending:');
  try {
    
    const pendingUsers = await User.find({ 'onboardingStatus.status': 'Pending' })
      .populate('personalInformation')
      .populate('documents')
      .select('username email personalInformation');
    console.log('pending:', pendingUsers);
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all rejected onboarding applications
const getRejectedApplications = async (req, res) => {
  try {
    const rejectedUsers = await User.find({ 'onboardingStatus.status': 'Rejected' })
      .populate('personalInformation')
      .populate('documents')
      .select('username email personalInformation onboardingStatus.feedback');
    
    res.status(200).json(rejectedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all approved onboarding applications
const getApprovedApplications = async (req, res) => {
  try {
    const approvedUsers = await User.find({ 'onboardingStatus.status': 'Approved' })
      .populate('personalInformation')
      .populate('documents')
      .select('username email personalInformation');
    
    res.status(200).json(approvedUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve an onboarding application
const approveApplication = async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      'onboardingStatus.status': 'Approved'
    });
    
    res.status(200).json({ message: 'Application approved successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject an onboarding application with feedback
const rejectApplication = async (req, res) => {
  const { userId, feedback } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      'onboardingStatus.status': 'Rejected',
      'onboardingStatus.feedback': feedback
    });
    
    res.status(200).json({ message: 'Application rejected with feedback.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getUsersWithPendingDocuments = async (req, res) => {
  try {
    const isAll = req.body.isAll;
    // Query to find visa statuses where not all documents are 'Approved'
    if (isAll) {
      const allVisaStatusRecords = await User.find({
        'role': 'Employee'
      }).
        populate('visaStatus').
        populate('documents').
        populate('personalInformation');
      res.status(200).json(allVisaStatusRecords);
    } else {
      const pendingVisaStatusRecords = await User.find({
        $or: [
          {'visaStatus.optReceipt.status': {$ne: 'Approved'}},
          {'visaStatus.optEad.status': {$ne: 'Approved'}},
          {'visaStatus.i983.status': {$ne: 'Approved'}},
          {'visaStatus.i20.status': {$ne: 'Approved'}}
        ],
        'role': 'Employee'
      }).
        populate('visaStatus').
        populate('documents').
        populate('personalInformation');
      res.status(200).json(pendingVisaStatusRecords);
    }
  } catch (error) {
    res.status(500).send(`Error retrieving users with documents: ${error.message}`);
  }
};

const getAllEmployees = async (req, res) =>  {
  try {
    const pendingVisaStatusRecords = await User.find({
      'role': 'Employee'
    }).populate('visaStatus')
    .populate('documents')
    .populate('personalInformation');

    res.status(200).json(pendingVisaStatusRecords);
  } catch (error) {
    res.status(500).send(`Error retrieving all employees: ${error.message}`);
  }
}

export default {
  register,
  login,
  logout,
  generateRegistrationTokenAndSendEmail,
  getUserById,
  updateUserById,
  getPendingApplications,
  getRejectedApplications,
  getApprovedApplications,
  approveApplication,
  rejectApplication,
  getUsersWithPendingDocuments,
  getAllEmployees,
  generateNotificationEmail
};
