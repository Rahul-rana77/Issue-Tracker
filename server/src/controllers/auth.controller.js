import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from "../services/email.service.js";
import { generateOTP, getOtpHTML } from "../utils/otp.util.js";

const registerUser = async (req, res) => {

    try {

        const { username, email, password, phone } = req.body;

        // Validate first
        if (!username || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Run both checks together
        const [existingEmail, existingUsername] = await Promise.all([
            userModel.findOne({ email }).lean(),
            userModel.findOne({ username }).lean()
        ]);

        if (existingEmail) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Faster hashing
        const hashedPassword = await bcrypt.hash(password, 6);

        const emailotp = generateOTP();

        // Create HTML only once
        const emailHtml = getOtpHTML(emailotp);

        // Create user
        const user = await userModel.create({
            username,
            email,
            phone,
            password: hashedPassword,
            emailVerificationCode: emailotp,
        });

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Cookie
        res.cookie("token", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            httpOnly: true
        });

        sendEmail(
            email,
            "Verify Your Email",
            `Your OTP is: ${emailotp}`,
            emailHtml
        ).then(() => {
            console.log("Email sent");
        }).catch((error) => {
            console.log("Email error:", error);
        });

        // SEND RESPONSE IMMEDIATELY
        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                isVerified: user.isVerified,
            }
        });

    } catch (error) {

        console.error("Register Error:", error);

        res.status(500).json({
            error: error.message
        });
    }
};

const verifyEmail = async (req, res) => {
            try {
                const { emailotp } = req.body;
                const user = await userModel.findOne({ 
                   emailVerificationCode: emailotp
                 });
                if (!user) {
                    return res.status(400).json({ message: "Invalid OTP or expired OTP" });
                }
                if (user.emailVerificationCode === emailotp) {
                    user.isVerified = true;
                    user.emailVerificationCode = undefined;
                    await user.save();
                    res.status(200).json({ message: "Email verified successfully" });
                } 
            } catch (error) {
                console.error("Error in verifyEmail:", error);
                res.status(500).json({ error: error.message });
            }
        };

         // Set a timeout to automatically verify the email after 10 minutes (600000 ms)
        setTimeout(verifyEmail, 600000);

const verifyPhone = async (req, res) => {
    try {
        const { phoneotp } = req.body;
        const user = await userModel.findOne({ 
            phoneVerificationCode: phoneotp
        });
        if (!user) {
            alert("Invalid OTP or expired OTP");
            return res.status(400).json({ message: "Invalid OTP or expired OTP" });
        }
        if (user.phoneVerificationCode === phoneotp) {
            user.isVerified = true;
            user.phoneVerificationCode = undefined;
            await user.save();
            res.status(200).json({ message: "Phone number verified successfully" });
        }
    } catch (error) {
        console.error("Error in verifyPhone:", error);
        res.status(500).json({ error: error.message });
    }
};

setTimeout(verifyPhone, 600000);

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).lean(); // Use lean() for faster read-only queries
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Account not verified. Please verify your email or phone." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Add token expiration for security

        res.cookie("token", token, {
            secure: true,
            sameSite: 'None',
            httpOnly: true // Add httpOnly for better security
        });

        res.status(200).json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                isVerified: user.isVerified,
            },
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token", {
        secure: true,
        sameSite: 'None',
        httpOnly: true // Ensure this matches the cookie settings in loginUser
    });
    res.status(200).json({ message: "Logout successful" });
};

const checkAuth = (req, res) => {
    if (req.user) {
        return res.status(200).json({
            message: "Authenticated",
            user: req.user
        });
    }
    res.status(401).json({ message: "Not authenticated" });
};


export { registerUser, verifyEmail, verifyPhone, loginUser, logoutUser, checkAuth };
