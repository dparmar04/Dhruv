const transporter = require('../nodemailerConfig');

exports.sendMessage = async (req, res) => {
   const { name, email, message } = req.body;

   if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
   }

   const mailOptions = {
      from: email,
      to: 'dronix.dev@gmail.com', // Your recipient email
      subject: 'Message From Portfolio',
      html: `
      <h3>New Message Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
   };

   try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: 'Message sent successfully!' });
   } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send message. Please try again.' });
   }
};
