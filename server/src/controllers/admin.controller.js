import adminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerAdmin = async (req, res) => {
    try {
        const { fullName, phone, email, code } = req.body;
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const existingPhone = await adminModel.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "Phone number already in use" });
        }

        if (!fullName || !phone || !email || !code) {
            return res.status(400).json({ message: "All fields are required" });
        }   

        if(code !== process.env.ADMIN_CODE) {
            return res.status(400).json({ message: "Invalid admin code" });
        }

        const hashedPassword = await bcrypt.hash(code, 10);

        const Admin = await adminModel.create({
            fullName,
            phone,
            email,
            code: hashedPassword
        });

        const adminToken = jwt.sign({
             id: Admin._id, 
            }, process.env.JWT_SECRET);
        res.cookie("token", adminToken);

        res.status(201).json({ 
            message: "Admin registered successfully", 
            admin: {
                _id: Admin._id,
                email: Admin.email,
                
            },
         });
    } catch (error) {
        console.error("Error in registerAdmin:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

const loginAdmin = async (req, res) => {
    const { email, code } = req.body;
    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(400).json({ message: "Invalid email " });
        }
        const isCodeValid = await bcrypt.compare(code, admin.code);
        if (!isCodeValid) {
            return res.status(400).json({ message: "Invalid admin code" });
        }
        const token = jwt.sign({
            id: admin._id,
        }, process.env.JWT_SECRET);
        res.cookie("token", token);

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
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    });
    res.status(200).json({ message: "Logout successful" });
};

export { registerAdmin, loginAdmin, logoutAdmin };

