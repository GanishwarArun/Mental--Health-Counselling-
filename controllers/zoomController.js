// import axios from 'axios';
// import dotenv from 'dotenv';
// import jwt from 'jsonwebtoken';

// dotenv.config();

// const ZOOM_API_BASE_URL = 'https://api.zoom.us/v2';

// // Generate a new Zoom JWT token
// const generateZoomToken = () => {
//   const payload = {
//     iss: process.env.ZOOM_CLIENT_ID, // Zoom API Key
//     exp: Math.floor(Date.now() / 1000) + 3600, // Token valid for 1 hour
//   };
//   return jwt.sign(payload, process.env.ZOOM_CLIENT_SECRET); // Sign the token with the API Secret
// };

// // Generate headers for authentication
// const getZoomHeaders = () => ({
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${generateZoomToken()}`, // Use the dynamically generated token
// });

// // Create a Zoom meeting
// export const createMeeting = async (req, res) => {
//   const { topic, start_time, duration, timezone } = req.body;

//   if (!topic || !start_time || !duration) {
//     return res.status(400).json({ message: 'Topic, start_time, and duration are required' });
//   }

//   const meetingData = {
//     topic,
//     type: 2, // Scheduled meeting
//     start_time,
//     duration,
//     timezone: timezone || 'UTC',
//     settings: {
//       host_video: true,
//       participant_video: true,
//       join_before_host: false,
//     },
//   };

//   try {
//     const response = await axios.post(
//       `${ZOOM_API_BASE_URL}/users/me/meetings`,
//       meetingData,
//       { headers: getZoomHeaders() }
//     );
//     res.status(201).json({ message: 'Meeting created successfully', meeting: response.data });
//   } catch (error) {
//     console.error('Error creating Zoom meeting:', error.response?.data || error.message);
//     res.status(500).json({
//       message: 'Failed to create Zoom meeting',
//       error: error.response?.data || error.message,
//     });
//   }
// };

// // Get a list of Zoom meetings
// export const listMeetings = async (req, res) => {
//   try {
//     const response = await axios.get(`${ZOOM_API_BASE_URL}/users/me/meetings`, {
//       headers: getZoomHeaders(),
//     });
//     res.status(200).json({ meetings: response.data.meetings });
//   } catch (error) {
//     console.error('Error fetching Zoom meetings:', error.response?.data || error.message);
//     res.status(500).json({
//       message: 'Failed to fetch Zoom meetings',
//       error: error.response?.data || error.message,
//     });
//   }
// };

// // Delete a Zoom meeting
// export const deleteMeeting = async (req, res) => {
//   const { meetingId } = req.params;

//   if (!meetingId) {
//     return res.status(400).json({ message: 'Meeting ID is required' });
//   }

//   try {
//     await axios.delete(`${ZOOM_API_BASE_URL}/meetings/${meetingId}`, {
//       headers: getZoomHeaders(),
//     });
//     res.status(200).json({ message: 'Meeting deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting Zoom meeting:', error.response?.data || error.message);
//     res.status(500).json({
//       message: 'Failed to delete Zoom meeting',
//       error: error.response?.data || error.message,
//     });
//   }
// };

