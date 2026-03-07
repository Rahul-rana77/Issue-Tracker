import { createIssue, getAllIssues, getIssueById, deleteIssue,updateIssueStatus } from "../controllers/issue.controller.js";
import express from "express";
import multer from "multer";
import authenticateMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.route("/")
    .get(
            authenticateMiddleware,
            getAllIssues
        );

router.route("/:id")
    .get(
        authenticateMiddleware,
        getIssueById
    )
    .delete( 
        authenticateMiddleware,
        deleteIssue
    );
router.route("/create-issue")
    .post(
        authenticateMiddleware, 
        upload.array('image',5), 
        createIssue
    );

router.route("/update-status/:id")
    .put(
        authenticateMiddleware,
        updateIssueStatus
    );


export default router;

