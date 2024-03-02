import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    return res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ msg: "User logged in", token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const dashboard = async (req, res) => {
  try {
    // Generate a random lucky number
    const luckyNumber = Math.floor(Math.random() * 100);

    return res.status(200).json({
      msg: `Hello, ${req.user.name}`,
      secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  dashboard,
  getAllUsers,
};
