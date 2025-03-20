# Online Mental Health Counselling Platform - Backend

## Overview
A comprehensive backend system for an online mental health counselling platform built with Node.js and Express. This system provides secure authentication, real-time chat capabilities, appointment scheduling, and payment processing.

## Technologies Used
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database management
- **Socket.io**: Real-time chat functionality
- **JWT**: Secure authentication
- **Bcrypt**: Password encryption
- **Stripe**: Payment processing
- **CORS**: Cross-origin resource sharing

## Features
- 🔐 Secure User Authentication
- 💬 Real-time Chat System
- 📅 Appointment Scheduling
- 💳 Secure Payment Processing
- 👥 User Profile Management
- 📧 Email Notifications
- 🤝 Counsellor-Patient Matching
- 🔄 Session Management

## API Endpoints

### Authentication
- POST `/auth/register` - User registration
- POST `/auth/login` - User login

### User Management
- GET `/users/profile` - Get user profile
- PUT `/users/profile` - Update user profile

### Appointments
- POST `/appointments/create` - Create new appointment
- GET `/appointments/list` - Get user appointments
- PUT `/appointments/:id` - Update appointment
- DELETE `/appointments/:id` - Cancel appointment

### Chat
- GET `/chat/messages` - Get chat history
- POST `/chat/send` - Send message
- GET `/chat/rooms` - Get active chat rooms

### Payments
- POST `/payments/process` - Process payment
- GET `/payments/history` - Get payment history

## Installation

1. Clone the repository:
```bash
git clone https://github.com/YourUsername/online-mental-app-be.git
Install dependencies: npm install

3. Create .env file with required environment variables:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_key


4. Start the server: npm start

5. Environment Variables
MONGODB_URI: MongoDB connection string

JWT_SECRET: Secret key for JWT

STRIPE_KEY: Stripe API key

PORT: Server port (default: 3000)

NODE_ENV: Environment (development/production) 

Contributing
Fork the repository

Create your feature branch ( git checkout -b feature/AmazingFeature)

Commit your changes ( git commit -m 'Add some AmazingFeature')

Push to the branch ( git push origin feature/AmazingFeature)

Open a Pull Request

License
This project is licensed under the MIT License - see the LICENSE file for details

Contact
Your Name - mailto:your.email@example.com
Project Link: https://github.com/YourUsername/online-mental-app-be

Acknowledgments
Express.js Documentation

MongoDB Documentation

Socket.io Documentation

Stripe API Documentation


This README.md:
- Clearly describes your project
- Lists all major technologies
- Details the features
- Provides installation instructions
- Documents API endpoints
- Includes contribution guidelines
- Provides proper formatting and emojis for better readability

You should customize:
1. Your actual GitHub username and repository link
2. Contact information
3. Any specific features unique to your implementation
4. Additional API endpoints you may have
5. Specific environment variables your app uses

Would you like me to modify any sec
