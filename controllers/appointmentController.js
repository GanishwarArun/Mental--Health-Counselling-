import Appointment from '../models/appointmentModel.js';

// Create an appointment
export const createAppointment = async (req, res) => {
  try {
    const { date, time, counselor } = req.body;

    // Validation
    if (!date || !time || !counselor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const appointmentTime = new Date(`${date}T${time}`);
    if (appointmentTime < new Date()) {
      return res.status(400).json({ message: 'Appointment time must be in the future' });
    }

    const newAppointment = new Appointment({ date, time, counselor });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = 'Cancelled';
    await appointment.save();
    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel appointment', error: error.message });
  }
};
