import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  // State variables for user input
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userId, setUserId] = useState(''); // User ID for update operations

  // State to display success or error messages
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle user registration (POST request)
  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!userName || !userEmail || !userPassword) {
      setMessage('⚠️ All fields are required.');
      setIsError(true);
      return;
    }

    setIsLoading(true); // Start loading
    setMessage(''); // Reset the message

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name: userName,
        email: userEmail,
        password: userPassword,
      });

      setMessage('✅ User registered successfully!');
      setIsError(false);
      console.log('✅ User registered:', response.data);

      // Clear form fields after successful registration
      setUserName('');
      setUserEmail('');
      setUserPassword('');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ An unexpected error occurred. Please try again later.');
      }
      setIsError(true);
      console.error('❌ Error registering user:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Function to handle getting user details (GET request)
  const handleGetUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setMessage(`✅ User details: ${JSON.stringify(response.data)}`);
      setIsError(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ An unexpected error occurred while fetching user.');
      }
      setIsError(true);
      console.error('❌ Error getting user details:', error);
    }
  };

  // Function to handle user update (PUT request)
  const handleUpdateUser = async (e) => {
    e.preventDefault();

    // Simple validation for update
    if (!userId || !userName || !userEmail || !userPassword) {
      setMessage('⚠️ All fields are required for update.');
      setIsError(true);
      return;
    }

    setIsLoading(true); // Start loading
    setMessage(''); // Reset the message

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, {
        name: userName,
        email: userEmail,
        password: userPassword,
      });

      setMessage('✅ User updated successfully!');
      setIsError(false);
      console.log('✅ User updated:', response.data);

      // Clear form fields after successful update
      setUserId('');
      setUserName('');
      setUserEmail('');
      setUserPassword('');
    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage('❌ An unexpected error occurred while updating user.');
      }
      setIsError(true);
      console.error('❌ Error updating user:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <h2>Register / Update User</h2>

      {message && (
        <div className={`message ${isError ? 'error-message' : 'success-message'}`}>
          {message}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Get User Form */}
      <div>
        <h3>Get User Details</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleGetUser}>Get User</button>
      </div>

      {/* Update User Form */}
      <div>
        <h3>Update User</h3>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Updated Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Updated Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Updated Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          required
        />
        <button onClick={handleUpdateUser} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update User'}
        </button>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   // State variables for user input
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');

//   // State to display success or error messages
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to handle registration
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     // Simple validation
//     if (!userName || !userEmail || !userPassword) {
//       setMessage('⚠️ All fields are required.');
//       setIsError(true);
//       return;
//     }

//     setIsLoading(true); // Start loading
//     setMessage(''); // Reset the message

//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', {
//         name: userName,
//         email: userEmail,
//         password: userPassword,
//       });

//       setMessage('✅ User registered successfully!');
//       setIsError(false);
//       console.log('✅ User registered:', response.data);

//       // Clear form fields after successful registration
//       setUserName('');
//       setUserEmail('');
//       setUserPassword('');
//     } catch (error) {
//       // Handle possible errors
//       if (error.response && error.response.data.message) {
//         setMessage(`❌ ${error.response.data.message}`);
//       } else {
//         setMessage('❌ An unexpected error occurred. Please try again later.');
//       }
//       setIsError(true);
//       console.error('❌ Error registering user:', error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>

//       {message && (
//         <div 
//           className={`message ${isError ? 'error-message' : 'success-message'}`}
//         >
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleRegister}>
//         <input 
//           type="text" 
//           placeholder="Name" 
//           value={userName} 
//           onChange={(e) => setUserName(e.target.value)} 
//           required 
//         />

//         <input 
//           type="email" 
//           placeholder="Email" 
//           value={userEmail} 
//           onChange={(e) => setUserEmail(e.target.value)} 
//           required 
//         />

//         <input 
//           type="password" 
//           placeholder="Password" 
//           value={userPassword} 
//           onChange={(e) => setUserPassword(e.target.value)} 
//           required 
//         />

//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;
// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/users/register', {
//         name: userName,
//         email: userEmail,
//         password: userPassword
//       });
//       console.log('✅ User registered:', response.data);
//     } catch (error) {
//       console.error('❌ Error registering user:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleRegister}>
//       <input type="text" placeholder="Name" value={userName} onChange={e => setUserName(e.target.value)} required />
//       <input type="email" placeholder="Email" value={userEmail} onChange={e => setUserEmail(e.target.value)} required />
//       <input type="password" placeholder="Password" value={userPassword} onChange={e => setUserPassword(e.target.value)} required />
//       <button type="submit">Register</button>
//     </form>
//   );
// };

// export default Register;

// import express from 'express';
// import bcrypt from 'bcryptjs'; // For hashing passwords
// import { body, validationResult } from 'express-validator'; // For input validation

// const router = express.Router();

// // Mock database (replace this with a real database in production)
// const users = []; // Replace with a real database, e.g., MongoDB

// // Registration route
// router.post(
//   '/register',
//   [
//     // Validation middleware
//     body('name').trim().notEmpty().withMessage('Name is required.'),
//     body('email').isEmail().withMessage('Invalid email address.'),
//     body('password')
//       .isLength({ min: 6 })
//       .withMessage('Password must be at least 6 characters long.'),
//   ],
//   async (req, res) => {
//     // Handle validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'Validation failed.', 
//         errors: errors.array() 
//       });
//     }

//     const { name, email, password } = req.body;

//     try {
//       // Check if the user already exists
//       const existingUser = users.find((user) => user.email === email);
//       if (existingUser) {
//         return res.status(409).json({ 
//           success: false, 
//           message: 'User already exists!' 
//         });
//       }

//       // Hash the password before storing it
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const response = await axios.post('http://localhost:5000/api/users/register', userData);
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`, userData);

//       // Create a new user object
//       const newUser = { 
//         name, 
//         email, 
//         password: hashedPassword // Store hashed password, not plain text
//       };

//       // Add the user to the "mock database"
//       users.push(newUser); // Replace with real DB logic, like MongoDB's User.create(newUser)

//       // Send a success response (only expose non-sensitive information)
//       res.status(201).json({ 
//         success: true, 
//         message: 'Registration successful', 
//         user: { name, email } 
//       });

//     } catch (err) {
//       console.error('Error registering user:', err);
//       res.status(500).json({ 
//         success: false, 
//         message: 'Server error. Please try again later.' 
//       });
//     }
//   }
// );

// export default router;

