import express from 'express';
import {
  createAppointment,
  getAppointments,
  cancelAppointment,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Route to create a new appointment
router.post('/', createAppointment);

// Route to get all appointments
router.get('/', getAppointments);

// Route to cancel an appointment
router.put('/cancel/:id', cancelAppointment);

export default router;
