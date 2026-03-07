import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, phone } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const User = await userModel.create({
            fullName,
            email,
            phone,
            password: hashedPassword
        });

        const token = jwt.sign({
             id: User._id, 
            }, process.env.JWT_SECRET);

        res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        });

        res.status(201).json({ 
            message: "User registered successfully", 
            user: {
                _id: User._id,
                fullName: User.fullName,
                email: User.email,
                phone: User.phone,
            },
         });

    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: "Server error" });
}};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None'
        });
        res.status(200).json({ 
            message: "Login successful", 
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
         });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'None'
    });
    res.status(200).json({ message: "Logout successful" });
};

const checkAuth = (req, res) => {
  if (!req.cookies.token) {
    return res.status(401).json({ loggedIn: false });
  }

  res.json({ loggedIn: true });
};

export { registerUser,loginUser,logoutUser,checkAuth };
