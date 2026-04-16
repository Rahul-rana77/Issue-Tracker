import adminModel from "../models/admin.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

