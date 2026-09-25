const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

const pendingRegistrations = new Map();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const buildUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isAdmin: user.role === 'admin',
});

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = generateOtp();
    pendingRegistrations.set(normalizedEmail, {
      name: name.trim(),
      email: normalizedEmail,
      password,
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const message = `
      <h2>Verify your ShopNest account</h2>
      <p>Hello ${name.trim()},</p>
      <p>Your One-Time Password is: <strong>${otp}</strong></p>
      <p>This code expires in 5 minutes.</p>
    `;

    await sendEmail({
      email: normalizedEmail,
      subject: 'ShopNest - Verify Your Account',
      message,
    });

    res.status(200).json({
      message: 'OTP sent to your email. Please verify to complete registration.',
      email: normalizedEmail,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyRegistration = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const pendingUser = pendingRegistrations.get(normalizedEmail);

    if (!pendingUser) {
      return res.status(400).json({ message: 'OTP request not found. Please register again.' });
    }

    if (Date.now() > pendingUser.expiresAt) {
      pendingRegistrations.delete(normalizedEmail);
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }

    if (String(pendingUser.otp) !== String(otp).trim()) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      pendingRegistrations.delete(normalizedEmail);
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pendingUser.password, salt);

    const user = await User.create({
      name: pendingUser.name,
      email: pendingUser.email,
      password: hashedPassword,
    });

    pendingRegistrations.delete(normalizedEmail);

    await sendEmail({
      email: user.email,
      subject: 'Welcome to ShopNest',
      message: `<h2>Welcome to ShopNest, ${user.name}!</h2><p>Your account has been created successfully.</p>`,
    });

    const userPayload = buildUserResponse(user);
    res.status(201).json({
      user: userPayload,
      token: generateToken(user._id),
      message: 'Registration successful!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = (email || '').trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await bcrypt.compare(password, user.password))) {
      const userPayload = buildUserResponse(user);
      res.json({
        user: userPayload,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'not authorized no token' });
  }
};

module.exports = { registerUser, verifyRegistration, loginUser, logoutUser, getUsers };