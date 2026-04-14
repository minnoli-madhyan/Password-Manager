import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from "cloudinary";
import streamifier from 'streamifier';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
let otps = {};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// API to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const normalizedEmail = email.toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email: normalizedEmail, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user ) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // res.json({
    //   success: true,
    //   message: "User logged in successfully",
    //   _id: user._id,
    //   email: user.email,
    //   token: generateToken(user._id),
    // });

    const otp = generateOtp();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 mins
    otps[email] = { otp, expiry };  // Store OTP and expiry in memory (consider using persistent storage)
    
    // Send OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'minnoli.m.madhyan@gmail.com',  // Your email address
        pass: 'ezhitshupnkhxdzm',  // Your Gmail app password
      },
    });

    var mailOptions = {
      from: 'minnoli.m.madhyan@gmail.com',
      to: email,
      subject: 'Sending Email using Node.js',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
          res.json({ success: true, message: 'OTP sent' });
      }
    });

  } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Server error occurred" });
  }
};

// OTP Verification API
  export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otps[email];
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
  
    if (storedOtp) {
      if (storedOtp.otp == otp && Date.now() < storedOtp.expiry) {
        // res.json({ success: true });
        res.json({
          success: true,
          message: "User logged in successfully",
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
      }
    } else {
      res.status(400).json({ success: false, message: 'OTP not found for this email' });
    }
  };

// API to get user profile data
export const getProfile = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.user.id;
    const imageFile = req.file;

    const updateData = { name, phone, address, dob, gender };

    if (imageFile) {
      const streamUpload = (buffer) =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image' },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });

      const result = await streamUpload(imageFile.buffer);
      updateData.image = result.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ success: true, message: 'Profile Updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};