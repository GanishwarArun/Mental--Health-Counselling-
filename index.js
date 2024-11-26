import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Database connection function
import userRoutes from './routes/userRoutes.js';

const app = express();

// MongoDB connection
(async () => {
    try {
        await connectDB(); // Calling the database connection function
        console.log('✅ Database connection successful');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Exit process if connection fails
    }
})();

// Middleware setup
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true,
    })
);

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello, World! The server is running.');
});

// Sample route to test GET, POST, PUT, DELETE
app.get('/api/data', (req, res) => {
    // Return some example data
    res.status(200).json({ message: 'GET request received!' });
});

app.post('/api/data', (req, res) => {
    // Handle POST request (example: create new data)
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    res.status(201).json({ message: `Data with name ${name} created!` });
});

app.put('/api/data/:id', (req, res) => {
    // Handle PUT request (example: update existing data)
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    res.status(200).json({ message: `Data with ID ${id} updated to ${name}` });
});

app.delete('/api/data/:id', (req, res) => {
    // Handle DELETE request (example: delete data)
    const { id } = req.params;
    res.status(200).json({ message: `Data with ID ${id} deleted!` });
});

// User routes
app.use('/api/users', userRoutes); // User routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ An error occurred:', err.message);
    res.status(500).json({ message: 'Internal server error occurred.' });
});

// 404 middleware for path not found
app.use((req, res) => {
    res.status(404).json({ message: '❌ Path not found' });
});

// Server listening
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
});


