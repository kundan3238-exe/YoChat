import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    return res.status(401).json({
      success: false,
      message: "Email or username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Original Password:", password);
  console.log("Hashed Password:", hashedPassword);

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  return res.status(200).json({
    success: true,
    message: "Registered Successfully",
  });

  } catch (error) {
    console.error(error)
  }

  return res.status(500).json({
    success:false,
    message:"Internal Server Error"
  })
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    });
  }
  res.json({
    success: true,
    message: "Login controller working",
  });
};

export const logout = (req, res) => {
  res.json({
    success: true,
    message: "Logout controller working",
  });
};

export const getMe = (req, res) => {
  res.json({
    success: true,
    message: "GetMe controller working",
  });
};
