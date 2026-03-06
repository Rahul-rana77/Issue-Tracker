import { registerUser,loginUser,logoutUser,checkAuth } from "../controllers/auth.controller.js";
import { registerAdmin, loginAdmin, logoutAdmin } from "../controllers/admin.controller.js";
import express from "express";
import authenticateUserMiddleware  from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/admin/register").post(registerAdmin);
router.route("/admin/login").post(loginAdmin);
router.route("/admin/logout")
    .delete(
        authenticateUserMiddleware,
        logoutAdmin
    );

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout")
    .delete(
        authenticateUserMiddleware,
        logoutUser
    );

router.route("/check")
    .get(
        authenticateUserMiddleware, 
        checkAuth
    );

export default router;