import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import Routes
import userRoutes from './routes/userRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
// import zoomRoutes from './routes/zoomRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
// import paypalRoutes from './routes/paypalRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors());

// Register Routes
app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/chat', chatRoutes);
// app.use('/zoom', zoomRoutes);
app.use('/api', emailRoutes);
// app.use('/paypal', paypalRoutes);

// Example Routes for Development and Testing
app.get('/register', (req, res) => {
  res.status(200).json({ message: 'Register endpoint - Use POST to register a user.' });
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  res.status(201).json({ message: 'User registered successfully.', data: { username, password } });
});

app.get('/login', (req, res) => {
  res.status(200).json({ message: 'Login endpoint - Use POST to log in a user.' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  res.status(200).json({ message: 'User logged in successfully.', data: { username } });
});

app.get('/dashboard', (req, res) => {
  res.status(200).json({ message: 'Dashboard endpoint - Use GET to fetch dashboard data.' });
});

// Default Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Backend API!',
    availableRoutes: [
      { path: '/register', methods: ['GET', 'POST'], description: 'User registration' },
      { path: '/login', methods: ['GET', 'POST'], description: 'User login' },
      { path: '/dashboard', methods: ['GET'], description: 'User dashboard' },
      { path: '/appointments', methods: ['GET', 'POST'], description: 'Manage appointments' },
      { path: '/chat', methods: ['GET', 'POST'], description: 'Chat functionality' },
      // { path: '/zoom', methods: ['GET', 'POST'], description: 'Zoom meeting integration' },
      { path: '/email', methods: ['GET', 'POST'], description: 'Email functionality' },
      // { path: '/paypal', methods: ['GET', 'POST'], description: 'PayPal payment integration' },
    ],
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// // Import Routes
// import userRoutes from './routes/userRoutes.js'; // Includes Register and Login
// import appointmentRoutes from './routes/appointmentRoutes.js'; // Booking appointments
// import chatRoutes from './routes/chatRoutes.js'; // Chat functionality
// import zoomRoutes from './routes/zoomRoutes.js'; // Zoom meeting integration
// import emailRoutes from './routes/emailRoutes.js'; // Email functionality
// import paypalRoutes from './routes/paypalRoutes.js'; // PayPal payment integration

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

// // Middleware
// app.use(express.json()); // Parse JSON requests
// app.use(cors()); // Enable CORS for frontend-backend communication

// // API Routes with GET and POST examples
// app.use('/users', userRoutes); // User authentication and registration
// app.use('/appointments', appointmentRoutes); // Appointment booking
// app.use('/chat', chatRoutes); // Chat functionality
// app.use('/zoom', zoomRoutes); // Zoom meeting management
// app.use('/api', emailRoutes); // Email functionality
// app.use('/paypal', paypalRoutes); // PayPal payment integration

// // Example GET and POST handlers for testing with Postman
// app.get('/register', (req, res) => {
//   res.status(200).json({ message: 'Register endpoint - Use POST to register a user.' });
// });

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   res.status(201).json({ message: 'User registered successfully.', data: { username, password } });
// });

// app.get('/login', (req, res) => {
//   res.status(200).json({ message: 'Login endpoint - Use POST to log in a user.' });
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   res.status(200).json({ message: 'User logged in successfully.', data: { username } });
// });

// app.get('/dashboard', (req, res) => {
//   res.status(200).json({ message: 'Dashboard endpoint - Use GET to fetch dashboard data.' });
// });

// app.get('/appointments', (req, res) => {
//   res.status(200).json({ message: 'Fetch all appointments.' });
// });

// app.post('/appointments', (req, res) => {
//   const { date, time, userId } = req.body;
//   res.status(201).json({ message: 'Appointment booked successfully.', data: { date, time, userId } });
// });

// app.get('/chat', (req, res) => {
//   res.status(200).json({ message: 'Chat endpoint - Use POST to send a message.' });
// });

// app.post('/chat', (req, res) => {
//   const { message, sender, receiver } = req.body;
//   res.status(200).json({ message: 'Message sent successfully.', data: { message, sender, receiver } });
// });

// app.get('/zoom', (req, res) => {
//   res.status(200).json({ message: 'Zoom endpoint - Use POST to create a meeting.' });
// });

// app.post('/zoom', (req, res) => {
//   const { topic, startTime, userId } = req.body;
//   res.status(201).json({ message: 'Zoom meeting created successfully.', data: { topic, startTime, userId } });
// });

// app.get('/email', (req, res) => {
//   res.status(200).json({ message: 'Email endpoint - Use POST to send an email.' });
// });

// app.post('/email', (req, res) => {
//   const { to, subject, body } = req.body;
//   res.status(200).json({ message: 'Email sent successfully.', data: { to, subject } });
// });

// app.get('/paypal', (req, res) => {
//   res.status(200).json({ message: 'PayPal endpoint - Use POST to process payment.' });
// });

// app.post('/paypal', (req, res) => {
//   const { amount, userId } = req.body;
//   res.status(200).json({ message: 'Payment processed successfully.', data: { amount, userId } });
// });

// // Default Route
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Welcome to the Backend API!',
//     availableRoutes: [
//       { path: '/register', methods: ['GET', 'POST'], description: 'User registration' },
//       { path: '/login', methods: ['GET', 'POST'], description: 'User login' },
//       { path: '/dashboard', methods: ['GET'], description: 'User dashboard' },
//       { path: '/appointments', methods: ['GET', 'POST'], description: 'Manage appointments' },
//       { path: '/chat', methods: ['GET', 'POST'], description: 'Chat functionality' },
//       { path: '/zoom', methods: ['GET', 'POST'], description: 'Zoom meeting integration' },
//       { path: '/email', methods: ['GET', 'POST'], description: 'Email functionality' },
//       { path: '/paypal', methods: ['GET', 'POST'], description: 'PayPal payment integration' },
//     ],
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

