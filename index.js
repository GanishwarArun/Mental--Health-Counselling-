import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

// ✅ Import loginRoutes
import loginRoutes from './routes/loginRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });

// ✅ Middleware
app.use(express.json()); 

// ✅ Updated CORS functionality to support Netlify URL
const allowedOrigins = [
  'https://strong-heliotrope-33def0.netlify.app',
   'http://localhost:5173'
  //  'https://online-mental-app-be.onrender.com'
  // 'https://strong-heliotrope-33def0.netlify.app' // ✅ Add Netlify URL to allowed origins
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // ✅ Allows cookies to be sent with requests
}));

// ✅ Use loginRoutes for /api path
app.use('/api', loginRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';

// // ✅ Import loginRoutes
// import loginRoutes from './routes/loginRoutes.js';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("❌ Error connecting to MongoDB:", err);
//   });

// // ✅ Middleware
// app.use(express.json()); 
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // ✅ Use loginRoutes for /api path
// app.use('/api', loginRoutes);

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

