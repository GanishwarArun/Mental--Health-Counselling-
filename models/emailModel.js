
import mongoose from 'mongoose';
const Email = require('./models/emailModels');

// Example: Save Email Data
const saveEmail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res.status(400).send({ success: false, message: 'All fields are required!' });
    }

    const newEmail = new Email({ email, subject, message });
    await newEmail.save();

    res.status(200).send({ success: true, message: 'Email saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Error saving email data' });
  }
};

module.exports = { saveEmail };
