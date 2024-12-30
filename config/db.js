import mongoose from 'mongoose';

// Reuse the existing User model if already defined, otherwise define a new model
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}));

export default User;

// import mongoose from 'mongoose';

// // Mongoose மாடலை மீண்டும் வரையறுக்காமல் அதே மாடலை பயன்படுத்துவோம்
// const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// }));

// export default User;

// import mongoose from 'mongoose';

// // Mongoose மாடலை மீண்டும் வரையறுக்காமல் அதே மாடலை பயன்படுத்துவோம்
// const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// }));

// export default User;

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// export default User;
// // import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         // Establish a connection to MongoDB
//         const conn = await mongoose.connect(process.env.MONGO_URI);
        
//         // Log success message
//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         // Log error details for better debugging
//         console.error('❌ Database connection failed:', error.message);
        
//         // Exit the application on connection failure
//         process.exit(1);
//     }
// };

// export default connectDB;

// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI); // ✅ Clean and simple
//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error('❌ Database connection failed:', error.message);
//         process.exit(1);
//     }
// };

// export default connectDB;
// import mongoose from 'mongoose';

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`❌ Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// export default connectDB;

// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       // Mongoose options related to connection are no longer necessary in the latest versions
//     });
    
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ Error: ${error.message}`);
//     process.exit(1); // Exit process with failure
//   }
// };

// export default connectDB;
