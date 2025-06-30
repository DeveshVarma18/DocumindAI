import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (recipient: string, subject: string,
  body: string) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      // Example for Gmail:
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variables
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password from environment variables
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: recipient, // Recipient address
      subject: subject, // Subject line
      text: body, // Plain text body
      // You can also add an HTML body: html: '<p>HTML body</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for the caller to handle
  }
};

export default sendEmail;