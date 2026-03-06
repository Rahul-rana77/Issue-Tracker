import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Sanitation',
            'Water Supply',
            'Roads & Infrastructure',
            'Electricity',
            'Traffic',
            'Pollution',
            'Public Safety',
            'Others'
        ]
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium',
    },
    status: {
        type: String,
        enum: ['Yet to Work', 'Working', 'Solved'],
        default: 'Yet to Work',
    }
}, { timestamps: true });

const issueModel = mongoose.model('Issue', issueSchema);

export default issueModel;