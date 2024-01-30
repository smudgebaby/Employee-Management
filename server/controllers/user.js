import user from '../models/user.js';
import {generateLoginToken, generateRegistrationToken, sendEmail} from '../middleware/auth.js'
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
    const { personalInformationId, documentIds, visaStatusId } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (personalInformationId) user.personalInformation = personalInformationId;
    if (documentIds) user.documents = documentIds;
    if (visaStatusId) user.visaStatus = visaStatusId;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default {
  register,
  login,
  logout,
  generateRegistrationTokenAndSendEmail,
  getUserById,
  updateUserById
}
