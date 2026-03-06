import issueModel from "../models/issue.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuidv4 } from 'uuid';

export const createIssue = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageUrl = await uploadFile(req.files[0].buffer, uuidv4());

        const issue = await issueModel.create({
            title: req.body.title,
            description: req.body.description,
            image: imageUrl.url,
            location: req.body.location,
            category: req.body.category,
            priority: req.body.priority,
        });

        res.status(201).json({
            message: 'Issue created successfully',
            issue,
        });
    } catch (error) {
        console.error("Error in createIssue:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getAllIssues = async (req, res) => {
    const issues = await issueModel.find().populate('title', 'email');
    res.status(200).json({
        message: 'Issues retrieved successfully',
        issues,
    });
};

export const getIssueById = async (req, res) => {
    const issue = await issueModel.findById(req.params.id).populate('title', 'fullName email');
    if (!issue) {
        return res.status(404).json({ message: 'Issue not found' });
    }
    res.status(200).json({
        message: 'Issue retrieved successfully',
        issue,
    });
};

export const deleteIssue = async (req, res) => {
    try {
        const issue = await issueModel.findById(req.params.id);
        if (!issue) {
            return res.status(404).json({ message: 'Issue not found' });
        }

        await issueModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Issue deleted successfully',
        });
    } catch (error) {
        console.error("Error in deleteIssue:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body

    if (!status) {
      return res.status(400).json({
        message: "Status is required"
      })
    }

    const issue = await issueModel.findByIdAndUpdate(
      req.params.id,
      { status: status.trim() },
      {
        new: true,
        runValidators: true
      }
    )

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Issue status updated successfully",
      issue
    })

  } catch (error) {
    console.error("Error updating issue status:", error)

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    })
  }
}