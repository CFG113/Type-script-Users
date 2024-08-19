import { getUsers as getAllUsers, getUserById, updateUserById, deleteUserById } from '../repositories';
import { hashPassword } from '../utils';
import { IUser } from '../interfaces';

export class UserService {

    // Get all users
    async getUsers(): Promise<IUser[]> {
        try {
            const users = await getAllUsers();
            // Remove the authentication field from all users
            return users.map(user => {
                const { authentication, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword as IUser;
            });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve users: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve users due to an unknown error');
            }
        }
    }

    // Get a user by ID
    async getUserById(id: string): Promise<IUser | null> {
        try {
            const user = await getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }

            // Return user object without the authentication field
            const { authentication, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword as IUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve user: ${error.message}`);
            } else {
                throw new Error('Failed to retrieve user due to an unknown error');
            }
        }
    }

    // Update a user by ID
    async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
        try {
            // Hash the password if it's being updated
            if (data.authentication?.password) {
                data.authentication.password = await hashPassword(data.authentication.password);
            }

            const updatedUser = await updateUserById(id, data);
            if (!updatedUser) {
                throw new Error('User not found');
            }

            // Return user object without the authentication field
            const { authentication, ...userWithoutPassword } = updatedUser.toObject();
            return userWithoutPassword as IUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update user: ${error.message}`);
            } else {
                throw new Error('Failed to update user due to an unknown error');
            }
        }
    }

    // Delete a user by ID
    async deleteUser(id: string): Promise<IUser | null> {
        try {
            const deletedUser = await deleteUserById(id);
            if (!deletedUser) {
                throw new Error('User not found');
            }

            // Return user object without the authentication field
            const { authentication, ...userWithoutPassword } = deletedUser.toObject();
            return userWithoutPassword as IUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete user: ${error.message}`);
            } else {
                throw new Error('Failed to delete user due to an unknown error');
            }
        }
    }
}
