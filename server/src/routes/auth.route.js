import { registerUser,loginUser,logoutUser,checkAuth } from "../controllers/auth.controller.js";
import { registerAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import express from "express";
import authenticateMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/admin/register").post(registerAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout")
    .delete(
        authenticateMiddleware,
        logoutAdmin
    );

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout")
    .delete(
        authenticateMiddleware,
        logoutUser
    );

router.route("/check")
    .get(
        authenticateMiddleware, 
        checkAuth
    );

export default router;