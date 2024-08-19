import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces';

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    lastLogin: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
