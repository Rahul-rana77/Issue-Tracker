import { createIssue, getAllIssues, getIssueById, deleteIssue,updateIssueStatus } from "../controllers/issue.controller.js";
import express from "express";
import multer from "multer";
import {authenticateUserMiddleware, authenticateAdminMiddleware}  from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.route("/")
    .get(
            authenticateUserMiddleware,
            getAllIssues
        );

router.route("/:id")
    .get(
        authenticateUserMiddleware,
        getIssueById
    )
    .delete( 
        authenticateUserMiddleware,
        deleteIssue
    );
router.route("/create-issue")
    .post(
        authenticateUserMiddleware, 
        upload.array('image',5), 
        createIssue
    );

router.route("/update-status/:id")
    .put(
        authenticateAdminMiddleware,
        updateIssueStatus
    );


export default router;

