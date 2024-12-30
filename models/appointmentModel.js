import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  counselor: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Upcoming',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
