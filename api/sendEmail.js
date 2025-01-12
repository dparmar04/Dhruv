import nodemailer from 'nodemailer';

export default async (req, res) => {
   if (req.method === 'POST') {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
         return res.status(400).json({ success: false, message: 'All fields are required.' });
      }

      try {
         const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: process.env.SMTP_USER,
               pass: process.env.SMTP_PASS,
            },
         });

         const mailOptions = {
            from: process.env.SMTP_USER, // Authenticated email
            to: process.env.SMTP_TO_EMAIL,
            subject: `Message from ${name}`,
            text: `Message: ${message}\n\nFrom: ${email}`, // Include user email in the body
         };

         await transporter.sendMail(mailOptions);
         res.setHeader('Content-Type', 'application/json');
         return res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
         console.error('Error sending email:', error);
         res.setHeader('Content-Type', 'application/json');
         return res.status(500).json({ success: false, message: 'Failed to send email.' });
      }
   } else {
      res.setHeader('Content-Type', 'application/json');
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
   }
};
