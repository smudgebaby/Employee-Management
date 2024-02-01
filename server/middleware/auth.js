import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export function generateLoginToken(user) {
  const payload = {
    id: user._id,
    role: user.role,
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  const options = {
    expiresIn: '1h'
  }

  const token = jwt.sign(payload, secretKey, options)

  return token
}

export const authenticateToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  const token = cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const checkAuthentication = async (req, res) => {
  const cookie = req.headers.cookie;
  const token = cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  if (!token) {
    return res.status(200).json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(200).json({ isAuthenticated: false });
    }
    res.status(200).json({ isAuthenticated: true, user: decoded });
  });
}

export const generateRegistrationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};


export const sendEmail = async (recipientEmail, registrationToken) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailDetail = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Complete your Registration',
    text: `Click the following link to finish your registration: http://localhost:5173/registration?token=${registrationToken}`,
  };

  await transporter.sendMail(mailDetail);
};

export const sendNotification = async (recipientEmail, fileType) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailDetail = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: `Submit your ${fileType}`,
    text: `Please submit your ${fileType}`,
  };

  await transporter.sendMail(mailDetail);
}
