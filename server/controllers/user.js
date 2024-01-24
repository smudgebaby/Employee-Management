import user from '../models/user.js';
import  {generateLoginToken, generateRegistrationToken, sendEmail} from '../middleware/auth.js'
const {User} = user;

const register = async (req, res) => {
  
  try {
    const { username, email, password, role } = req.body
    
    if(await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    if(await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already exists' })
    }
    
    const user = new User({ username, email, password, role});

    await user.save();
    res.status(201).json({ message: 'User created'});

  } catch(err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const login = async (req, res) => {

  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if(!user) {
      return res.status(400).json({ message: 'Invalid username'})
    }

    if(user.password !== password) {
      return res.status(400).json({ message: 'Password not match'})
    }

    const token = generateLoginToken(user);

    const role = user.role === 'employee' ? 1 : 2;
    res.status(200).json({ message: 'Sign in successful', token, role })

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'Server Error'});
  }
}


const generateRegistrationTokenAndSendEmail = async (req, res) => {

  try {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const registrationToken = generateRegistrationToken();

    // TODO: Save the registration token in the database
    // might need a token Schema

    await sendEmail(email, registrationToken);

    res.status(200).json({ message: 'Registration token sent' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



export default {
  register,
  login,
  generateRegistrationTokenAndSendEmail,
}
