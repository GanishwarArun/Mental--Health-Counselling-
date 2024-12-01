import express from 'express';
const router = express.Router();

// User Registration Endpoint
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: '⚠️ All fields are required!' });
    }

    // Simulating a successful registration
    res.status(201).json({ message: '✅ User registered successfully!', user: { name, email } });
});

// User Login Endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: '⚠️ Email and password are required!' });
    }

    // Simulating a simple login check
    if (email === 'test@example.com' && password === 'password123') {
        return res.status(200).json({ message: '✅ Login successful!' });
    }

    res.status(401).json({ message: '❌ Invalid email or password!' });
});

export default router;



// import express from 'express';
// const router = express.Router();

// router.post('/login', (req, res) => {
//     const { identifier, password } = req.body; // Using 'identifier' as a generic field

//     if (!identifier || !password) {
//         return res.status(400).json({ message: '⚠️ Identifier (email/username) and password are required' });
//     }

//     // Example: Hardcoded identifier and password for simplicity (this should be replaced by DB check)
//     const validUser = {
//         identifier: 'user@example.com',  // 'identifier' can be an email or username
//         password: 'password123'          // This should be hashed in a real app
//     };

//     // Check if provided credentials match the valid credentials
//     if (identifier === validUser.identifier && password === validUser.password) {
//         // Successful login
//         return res.status(200).json({ message: '✅ Login successful!' });
//     }

//     // If credentials are incorrect, send 401 Unauthorized response
//     return res.status(401).json({ message: '❌ Unauthorized: Invalid identifier or password' });
// });

// export default router;

// import express from 'express';

// const router = express.Router();

// // Define example route
// router.get('/', (req, res) => {
//   res.send('User Routes Working!');
// });

// export default router;
