import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { name, email, password });
      setMessage(response.data.message);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
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
//   const [userId, setUserId] = useState(''); // User ID for update operations

//   // State to display success or error messages
//   const [message, setMessage] = useState('');
//   const [isError, setIsError] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to handle user registration (POST request)
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

//   // Function to handle getting user details (GET request)
//   const handleGetUser = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
//       setMessage(`✅ User details: ${JSON.stringify(response.data)}`);
//       setIsError(false);
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setMessage(`❌ ${error.response.data.message}`);
//       } else {
//         setMessage('❌ An unexpected error occurred while fetching user.');
//       }
//       setIsError(true);
//       console.error('❌ Error getting user details:', error);
//     }
//   };

//   // Function to handle user update (PUT request)
//   const handleUpdateUser = async (e) => {
//     e.preventDefault();

//     // Simple validation for update
//     if (!userId || !userName || !userEmail || !userPassword) {
//       setMessage('⚠️ All fields are required for update.');
//       setIsError(true);
//       return;
//     }

//     setIsLoading(true); // Start loading
//     setMessage(''); // Reset the message

//     try {
//       const response = await axios.put(`http://localhost:5000/api/users/${userId}`, {
//         name: userName,
//         email: userEmail,
//         password: userPassword,
//       });

//       setMessage('✅ User updated successfully!');
//       setIsError(false);
//       console.log('✅ User updated:', response.data);

//       // Clear form fields after successful update
//       setUserId('');
//       setUserName('');
//       setUserEmail('');
//       setUserPassword('');
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         setMessage(`❌ ${error.response.data.message}`);
//       } else {
//         setMessage('❌ An unexpected error occurred while updating user.');
//       }
//       setIsError(true);
//       console.error('❌ Error updating user:', error);
//     } finally {
//       setIsLoading(false); // Stop loading
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register / Update User</h2>

//       {message && (
//         <div className={`message ${isError ? 'error-message' : 'success-message'}`}>
//           {message}
//         </div>
//       )}

//       {/* Registration Form */}
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

//       {/* Get User Form */}
//       <div>
//         <h3>Get User Details</h3>
//         <input
//           type="text"
//           placeholder="User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         />
//         <button onClick={handleGetUser}>Get User</button>
//       </div>

//       {/* Update User Form */}
//       <div>
//         <h3>Update User</h3>
//         <input
//           type="text"
//           placeholder="User ID"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Updated Name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Updated Email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Updated Password"
//           value={userPassword}
//           onChange={(e) => setUserPassword(e.target.value)}
//           required
//         />
//         <button onClick={handleUpdateUser} disabled={isLoading}>
//           {isLoading ? 'Updating...' : 'Update User'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;

