import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationCode: {
        type: String,
    },
    phoneVerificationCode: {
        type: String,
    },
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;