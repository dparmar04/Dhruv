const nodemailer = require('nodemailer');

export default async (req, res) => {
   if (req.method === 'POST') {
      const { name, email, message } = req.body;

      // Setup Nodemailer
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: 'dronix.dev@gmail.com',
            pass: 'tiov ysgz dcrw qvgh',
         },
      });

      const mailOptions = {
         from: email,
         to: 'dronix.dev@gmailcom', // Your email where you want to receive messages
         subject: `Message from ${name}`,
         text: message,
      };

      try {
         await transporter.sendMail(mailOptions);
         res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
         res.status(500).json({ success: false, message: 'Failed to send email' });
      }
   } else {
      res.status(405).json({ message: 'Method Not Allowed' });
   }
};
