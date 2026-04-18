import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await userModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email " });
        }

        if(!admin.isVerified) {
            return res.status(403).json({ message: "Admin not verified. Please verify your email and phone number." });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const adminToken = jwt.sign({
            id: admin._id,
        }, process.env.JWT_SECRET);
        res.cookie("adminToken", adminToken, {
            secure: true,
            sameSite: 'None'
        });

        res.status(200).json({
            message: "Admin logged in successfully",
            admin: {
                _id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        console.error("Error in loginAdmin:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutAdmin = (req, res) => {
    res.clearCookie("adminToken",{
        secure: true,
        sameSite: 'None'
    });
    res.status(200).json({ message: "Logout successful" });
};

export { loginAdmin, logoutAdmin };

