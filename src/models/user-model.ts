import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select:false,
    },
    googleId: {
        type: String, 
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
