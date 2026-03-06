import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const adminModel = mongoose.model('Admin', adminSchema);

export default adminModel;