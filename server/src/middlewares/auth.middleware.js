import userModel from '../models/user.model.js';
import adminModel from '../models/admin.model.js';
import jwt from 'jsonwebtoken';

const authenticateMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const adminToken = req.cookies.adminToken;
    console.log("cookies:", req.cookies);
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      return next();
    }

    if (adminToken) {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
      const admin = await adminModel.findById(decoded.id);
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
      req.admin = admin;
      return next();
    }

    return res.status(401).json({ message: "Please login first" });

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default authenticateMiddleware;