const nodemailer = require('nodemailer');

// Configure your email transport
const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'dronix.dev@gmail.com', // Replace with your Gmail
      pass: 'tiov ysgz dcrw qvgh', // Replace with your email password or app password
   },
});

// Verify transporter configuration
transporter.verify((error, success) => {
   if (error) {
      console.log('Error configuring Nodemailer:', error);
   } else {
      console.log('Nodemailer configured successfully');
   }
});

module.exports = transporter;
