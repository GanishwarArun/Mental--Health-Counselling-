// Controller for user registration
export const registerUser = async (req, res) => {
  try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ message: '⚠️ All fields are required!' });
      }

      // Simulate saving user to the database
      res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
      res.status(500).json({ message: '🚨 Error registering user.' });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.EMAIL && password === process.env.PASSWORD) {
      return res.status(200).json({ message: '✅ Login successful!' });
  }
  res.status(401).json({ message: '❌ Invalid email or password!' });
};

// Get all users
export const getAllUsers = async (req, res) => {
  res.status(200).json({ message: '✅ All users retrieved successfully!' });
};

// export const register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;
//     const user = new User({ name, email, password, role });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
//     res.json({ token, role: user.role });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
