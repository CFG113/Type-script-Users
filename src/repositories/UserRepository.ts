import { UserModel } from '../models';
import { IUser } from '../interfaces';

// Create a new user
export const createUser = async (data: IUser) => {
    const user = new UserModel(data);
    await user.save();
    return user;
};

// Get all users
export const getUsers = async () => {
    return UserModel.find().exec();
};

// Get user by email with password
export const getUserByEmail = async (email: string) => {
    return UserModel.findOne({ email }).select('+authentication.password').exec();
};

// Get user by username with password
export const getUserByUsername = async (username: string) => {
    return UserModel.findOne({ username }).select('+authentication.password').exec();
};

// Get user by ID
export const getUserById = async (id: string) => {
    return UserModel.findById(id).exec();
};

// Update a user by ID
export const updateUserById = async (id: string, data: Partial<IUser>) => {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
};

// Delete a user by ID
export const deleteUserById = async (id: string) => {
    return UserModel.findOneAndDelete({ _id: id }).exec();
};
