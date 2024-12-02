import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; // Database connection function
import userRoutes from './routes/userRoutes.js'; // Assuming this handles user-related routes

const app = express();

// MongoDB connection
(async () => {
    try {
        await connectDB(); // Call the database connection function
        console.log('✅ Database connection successful');
    } catch (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1); // Exit the process if connection fails
    }
})();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests

// Enhanced CORS Configuration
const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'];

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Allow only specified origins
            if (!allowedOrigins.includes(origin)) {
                const msg = 'The CORS policy for this site does not allow access from the specified origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
        credentials: true, // Allow credentials like cookies
        allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    })
);

// Root route - simple test to ensure the server is up
app.get('/', (req, res) => {
    res.status(200).send('🌟 Server is up and running! Ready to accept requests.');
});

// Sample CRUD routes for testing
app.get('/api/data', (req, res) => {
    res.status(200).json({ message: 'GET request received! Here is your data.' });
});

app.post('/api/data', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '⚠️ Name is required' });
    }
    res.status(201).json({ message: `✅ Data with name "${name}" created successfully!` });
});

app.put('/api/data/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '⚠️ Name is required' });
    }
    res.status(200).json({ message: `✅ Data with ID "${id}" updated to "${name}"` });
});

app.delete('/api/data/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `✅ Data with ID "${id}" deleted successfully!` });
});

// User routes - Assuming you have a userRoutes.js file to handle these routes
app.use('/api/users', userRoutes); // Example: CRUD operations for users

// User login route
app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: '⚠️ Email and password are required!' });
    }

    // Check email and password against environment variables
    if (email === process.env.EMAIL && password === process.env.PASSWORD) {
        return res.status(200).json({ message: '✅ Login successful!' });
    }

    res.status(401).json({ message: '❌ Invalid email or password!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ An error occurred:', err.message);
    res.status(500).json({ message: '🚨 Internal server error. Please try again later.' });
});

// 404 middleware for path not found
app.use((req, res) => {
    res.status(404).json({ message: '❌ Path not found. Please check the endpoint.' });
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

// import dotenv from 'dotenv';
// dotenv.config(); // Load environment variables from .env file

// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js'; // Database connection function
// import userRoutes from './routes/userRoutes.js'; // Assuming this handles user-related routes

// const app = express();

// // MongoDB connection
// (async () => {
//     try {
//         await connectDB(); // Call the database connection function
//         console.log('✅ Database connection successful');
//     } catch (err) {
//         console.error('❌ Database connection failed:', err.message);
//         process.exit(1); // Exit the process if connection fails
//     }
// })();

// // Middleware setup
// app.use(express.json()); // Parse incoming JSON requests

// // Enhanced CORS Configuration
// const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             // Allow requests with no origin (like mobile apps or curl requests)
//             if (!origin) return callback(null, true);

//             // Allow only specified origins
//             if (!allowedOrigins.includes(origin)) {
//                 const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//                 return callback(new Error(msg), false);
//             }
//             return callback(null, true);
//         },
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//         credentials: true, // Allow credentials like cookies
//         allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//     })
// );

// // Root route - simple test to ensure the server is up
// app.get('/', (req, res) => {
//     res.status(200).send('🌟 Server is up and running! Ready to accept requests.');
// });

// // Sample CRUD routes for testing
// app.get('/api/data', (req, res) => {
//     res.status(200).json({ message: 'GET request received! Here is your data.' });
// });

// app.post('/api/data', (req, res) => {
//     const { name } = req.body;
//     if (!name) {
//         return res.status(400).json({ message: '⚠️ Name is required' });
//     }
//     res.status(201).json({ message: `✅ Data with name "${name}" created successfully!` });
// });

// app.put('/api/data/:id', (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;
//     if (!name) {
//         return res.status(400).json({ message: '⚠️ Name is required' });
//     }
//     res.status(200).json({ message: `✅ Data with ID "${id}" updated to "${name}"` });
// });

// app.delete('/api/data/:id', (req, res) => {
//     const { id } = req.params;
//     res.status(200).json({ message: `✅ Data with ID "${id}" deleted successfully!` });
// });

// // User routes - Assuming you have a userRoutes.js file to handle these routes
// app.use('/api/users', userRoutes); // Example: CRUD operations for users

// // User login route
// app.post('/api/login', (req, res) => {
//     const { email, password } = req.body;

//     // Validate email and password
//     if (!email || !password) {
//         return res.status(400).json({ message: '⚠️ Email and password are required!' });
//     }

//     // Mock login logic (replace this with actual database check)
//     if (email === 'test@example.com' && password === 'password123') {
//         return res.status(200).json({ message: '✅ Login successful!' });
//     }

//     res.status(401).json({ message: '❌ Invalid email or password!' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error('❌ An error occurred:', err.message);
//     res.status(500).json({ message: '🚨 Internal server error. Please try again later.' });
// });

// // 404 middleware for path not found
// app.use((req, res) => {
//     res.status(404).json({ message: '❌ Path not found. Please check the endpoint.' });
// });

// // Server listening
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`✅ Server is running on port ${PORT}`);
//     console.log(`🌐 Visit http://localhost:${PORT}`);
// });

// // import dotenv from 'dotenv';
// // dotenv.config(); // Load environment variables from .env file

// // import express from 'express';
// // import cors from 'cors';
// // import connectDB from './config/db.js'; // Database connection function
// // import userRoutes from './routes/userRoutes.js'; // Assuming this handles user-related routes

// // const app = express();

// // // MongoDB connection
// // (async () => {
// //     try {
// //         await connectDB(); // Call the database connection function
// //         console.log('✅ Database connection successful');
// //     } catch (err) {
// //         console.error('❌ Database connection failed:', err.message);
// //         process.exit(1); // Exit the process if connection fails
// //     }
// // })();

// // // Middleware setup
// // app.use(express.json()); // Parse incoming JSON requests

// // // Enhanced CORS Configuration
// // const allowedOrigins = [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:3000'];
// // app.use(
// //     cors({
// //       origin: 'http://localhost:3000',
// //         // origin: (origin, callback) => {
// //             // Allow requests with no origin (like mobile apps or curl requests)
// //             // if (!origin) return callback(null, true);
// //             if (allowedOrigins.indexOf(origin) === -1) {
// //                 const msg = 'The CORS policy for this site does not allow access from the specified origin.';
// //                 return callback(new Error(msg), false);
// //             }
// //             return callback(null, true);
// //         },
// //         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
// //         credentials: true, // Allow credentials like cookies
// //         allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// //     })
// // );

// // // Root route - simple test to ensure the server is up
// // app.get('/', (req, res) => {
// //     res.status(200).send('🌟 Server is up and running! Ready to accept requests.');
// // });

// // // Sample CRUD routes for testing
// // app.get('/api/data', (req, res) => {
// //     res.status(200).json({ message: 'GET request received! Here is your data.' });
// // });

// // app.post('/api/data', (req, res) => {
// //     const { name } = req.body;
// //     if (!name) {
// //         return res.status(400).json({ message: '⚠️ Name is required' });
// //     }
// //     res.status(201).json({ message: `✅ Data with name "${name}" created successfully!` });
// // });

// // app.put('/api/data/:id', (req, res) => {
// //     const { id } = req.params;
// //     const { name } = req.body;
// //     if (!name) {
// //         return res.status(400).json({ message: '⚠️ Name is required' });
// //     }
// //     res.status(200).json({ message: `✅ Data with ID "${id}" updated to "${name}"` });
// // });

// // app.delete('/api/data/:id', (req, res) => {
// //     const { id } = req.params;
// //     res.status(200).json({ message: `✅ Data with ID "${id}" deleted successfully!` });
// // });

// // // User routes - Assuming you have a userRoutes.js file to handle these routes
// // app.use('/api/users', userRoutes); // Example: CRUD operations for users

// // // User login route
// // app.post('/api/login', (req, res) => {
// //     const { email, password } = req.body;

// //     // Validate email and password
// //     if (!email || !password) {
// //         return res.status(400).json({ message: '⚠️ Email and password are required!' });
// //     }

// //     // Mock login logic (replace this with actual database check)
// //     if (email === 'test@example.com' && password === 'password123') {
// //         return res.status(200).json({ message: '✅ Login successful!' });
// //     }

// //     res.status(401).json({ message: '❌ Invalid email or password!' });
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //     console.error('❌ An error occurred:', err.message);
// //     res.status(500).json({ message: '🚨 Internal server error. Please try again later.' });
// // });

// // // 404 middleware for path not found
// // app.use((req, res) => {
// //     res.status(404).json({ message: '❌ Path not found. Please check the endpoint.' });
// // });

// // // Server listening
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //     console.log(`✅ Server is running on port ${PORT}`);
// //     console.log(`🌐 Visit http://localhost:${PORT}`);
// // });

// // // import dotenv from 'dotenv';
// // // dotenv.config(); // Load environment variables from .env file

// // // import express from 'express';
// // // import cors from 'cors';
// // // import connectDB from './config/db.js'; // Database connection function
// // // import userRoutes from './routes/userRoutes.js'; // Assuming this handles user-related routes

// // // const app = express();

// // // // MongoDB connection
// // // (async () => {
// // //     try {
// // //         await connectDB(); // Call the database connection function
// // //         console.log('✅ Database connection successful');
// // //     } catch (err) {
// // //         console.error('❌ Database connection failed:', err.message);
// // //         process.exit(1); // Exit the process if connection fails
// // //     }
// // // })();

// // // // Middleware setup
// // // app.use(express.json()); // Parse incoming JSON requests
// // // app.use(
// // //     cors({
// // //         origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow frontend URL
// // //         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
// // //         credentials: true, // Allow credentials like cookies
// // //     })
// // // );

// // // // Root route - simple test to ensure the server is up
// // // app.get('/', (req, res) => {
// // //     res.status(200).send('🌟 Server is up and running! Ready to accept requests.');
// // // });

// // // // Sample CRUD routes for testing
// // // app.get('/api/data', (req, res) => {
// // //     res.status(200).json({ message: 'GET request received! Here is your data.' });
// // // });

// // // app.post('/api/data', (req, res) => {
// // //     const { name } = req.body;
// // //     if (!name) {
// // //         return res.status(400).json({ message: '⚠️ Name is required' });
// // //     }
// // //     res.status(201).json({ message: `✅ Data with name "${name}" created successfully!` });
// // // });

// // // app.put('/api/data/:id', (req, res) => {
// // //     const { id } = req.params;
// // //     const { name } = req.body;
// // //     if (!name) {
// // //         return res.status(400).json({ message: '⚠️ Name is required' });
// // //     }
// // //     res.status(200).json({ message: `✅ Data with ID "${id}" updated to "${name}"` });
// // // });

// // // app.delete('/api/data/:id', (req, res) => {
// // //     const { id } = req.params;
// // //     res.status(200).json({ message: `✅ Data with ID "${id}" deleted successfully!` });
// // // });

// // // // User routes - Assuming you have a userRoutes.js file to handle these routes
// // // app.use('/api/users', userRoutes); // Example: CRUD operations for users

// // // // User login route
// // // app.post('/api/login', (req, res) => {
// // //     const { email, password } = req.body;

// // //     // Validate email and password
// // //     if (!email || !password) {
// // //         return res.status(400).json({ message: '⚠️ Email and password are required!' });
// // //     }

// // //     // Mock login logic (replace this with actual database check)
// // //     if (email === 'test@example.com' && password === 'password123') {
// // //         return res.status(200).json({ message: '✅ Login successful!' });
// // //     }

// // //     res.status(401).json({ message: '❌ Invalid email or password!' });
// // // });

// // // // Error handling middleware
// // // app.use((err, req, res, next) => {
// // //     console.error('❌ An error occurred:', err.message);
// // //     res.status(500).json({ message: '🚨 Internal server error. Please try again later.' });
// // // });

// // // // 404 middleware for path not found
// // // app.use((req, res) => {
// // //     res.status(404).json({ message: '❌ Path not found. Please check the endpoint.' });
// // // });

// // // // Server listening
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //     console.log(`✅ Server is running on port ${PORT}`);
// // //     // console.log(`🌐 Visit http://localhost:${PORT}`);
// // // });

// // // // import dotenv from 'dotenv';
// // // // dotenv.config(); // Load environment variables from .env file

// // // // import express from 'express';
// // // // import cors from 'cors';
// // // // import connectDB from './config/db.js'; // Database connection function
// // // // import userRoutes from './routes/userRoutes.js';

// // // // const app = express();

// // // // // MongoDB connection
// // // // (async () => {
// // // //     try {
// // // //         await connectDB(); // Calling the database connection function
// // // //         console.log('✅ Database connection successful');
// // // //     } catch (err) {
// // // //         console.error('❌ Database connection failed:', err.message);
// // // //         process.exit(1); // Exit process if connection fails
// // // //     }
// // // // })();

// // // // // Middleware setup
// // // // app.use(express.json());
// // // // app.use(
// // // //     cors({
// // // //         origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL
// // // //         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
// // // //         credentials: true,
// // // //     })
// // // // );

// // // // // Routes
// // // // app.get('/', (req, res) => {
// // // //     res.status(200).send('Hello, World! The server is running.');
// // // // });

// // // // // Sample route to test GET, POST, PUT, DELETE
// // // // app.get('/api/data', (req, res) => {
// // // //     // Return some example data
// // // //     res.status(200).json({ message: 'GET request received!' });
// // // // });

// // // // app.post('/api/data', (req, res) => {
// // // //     // Handle POST request (example: create new data)
// // // //     const { name } = req.body;
// // // //     if (!name) {
// // // //         return res.status(400).json({ message: 'Name is required' });
// // // //     }
// // // //     res.status(201).json({ message: `Data with name ${name} created!` });
// // // // });

// // // // app.put('/api/data/:id', (req, res) => {
// // // //     // Handle PUT request (example: update existing data)
// // // //     const { id } = req.params;
// // // //     const { name } = req.body;
// // // //     if (!name) {
// // // //         return res.status(400).json({ message: 'Name is required' });
// // // //     }
// // // //     res.status(200).json({ message: `Data with ID ${id} updated to ${name}` });
// // // // });

// // // // app.delete('/api/data/:id', (req, res) => {
// // // //     // Handle DELETE request (example: delete data)
// // // //     const { id } = req.params;
// // // //     res.status(200).json({ message: `Data with ID ${id} deleted!` });
// // // // });

// // // // // User routes
// // // // app.use('/api/users', userRoutes); // User routes

// // // // // Error handling middleware
// // // // app.use((err, req, res, next) => {
// // // //     console.error('❌ An error occurred:', err.message);
// // // //     res.status(500).json({ message: 'Internal server error occurred.' });
// // // // });

// // // // // 404 middleware for path not found
// // // // app.use((req, res) => {
// // // //     res.status(404).json({ message: '❌ Path not found' });
// // // // });

// // // // // Server listening
// // // // const PORT = process.env.PORT || 5000;
// // // // app.listen(PORT, () => {
// // // //     console.log(`✅ Server is running on port ${PORT}`);
// // // //     console.log(`Visit http://localhost:${PORT}`);
// // // // });


