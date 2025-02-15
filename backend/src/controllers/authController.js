const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { insertUser, getUserByEmail } = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    // Log the received request body for debugging
    console.log('Received request body:', req.body);
    
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await insertUser(name, email, hashedPassword);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: "Error registering user", 
      error: error.message 
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: "Error logging in", 
      error: error.message 
    });
  }
};

module.exports = { registerUser, loginUser };
