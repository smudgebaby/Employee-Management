import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

function generateLoginToken(user) {
  const payload = {
    id: user._id,
    username: user.username
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  const options = {
    expiresIn: '1h'
  }

  const token = jwt.sign(payload, secretKey, options)

  return token
}


const generateRegistrationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};


const sendEmail = async (recipientEmail, registrationToken) => {
  const transporter = nodemailer.createTransport({
    // TODO: config email and password
    service: 'gmail',
    auth: {
      // user: process.env.EMAIL_USER,
      // process.env.EMAIL_PASSWORD,
    },
  });

  const mailDetail = {
    // from: process.env.EMAIL_USER,
    to: recipientEmail,
    subject: 'Complete your Registration',
    text: `Click the following link to finish your registration: http://localhost:5173/registration?token=${registrationToken}`,
  };

  await transporter.sendMail(mailDetail);
};


export default {generateLoginToken, generateRegistrationToken, sendEmail};
