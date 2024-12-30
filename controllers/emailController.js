const nodemailer = require('nodemailer');

// Send email function
const sendEmail = async (req, res) => {
  const { email, subject, message } = req.body;

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Create email transport
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-email-password', // Replace with your app password
      },
    });

    // Email options
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
  }
};

module.exports = { sendEmail };
