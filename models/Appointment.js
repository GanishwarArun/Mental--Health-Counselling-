import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  counselorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  sessionType: { type: String, required: true },
  status: { type: String, default: "pending" },
});

export default mongoose.model("Appointment", appointmentSchema);
