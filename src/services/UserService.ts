import { getUsers as getAllUsers, getUserById, updateUserById, deleteUserById } from '../repositories';
import { hashPassword } from '../utils';
import { IUser } from '../interfaces';

export class UserService {

    async getUsers() {
        try {
            const users = await getAllUsers();
            return users.map(user => {
                const { password, ...userWithoutPassword } = user.toObject();
                return userWithoutPassword;
            });
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve users: ${error.message}`);
            }
            throw new Error('Failed to retrieve users due to an unknown error');
        }
    }

    async getUserById(id: string) {
        try {
            const user = await getUserById(id);
            if (!user) {
                throw new Error('User not found');
            }

            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to retrieve user: ${error.message}`);
            }
            throw new Error('Failed to retrieve user due to an unknown error');
        }
    }

    async updateUser(id: string, data: Partial<IUser>) {
        try {
            if (data.password) {
                data.password = await hashPassword(data.password);
            }

            const updatedUser = await updateUserById(id, data);
            if (!updatedUser) {
                throw new Error('User not found');
            }

            const { password, ...userWithoutPassword } = updatedUser.toObject();
            return userWithoutPassword;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update user: ${error.message}`);
            }
            throw new Error('Failed to update user due to an unknown error');
        }
    }

    async deleteUser(id: string) {
        try {
            const deletedUser = await deleteUserById(id);
            if (!deletedUser) {
                throw new Error('User not found');
            }

            const { password, ...userWithoutPassword } = deletedUser.toObject();
            return userWithoutPassword;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete user: ${error.message}`);
            }
            throw new Error('Failed to delete user due to an unknown error');
        }
    }
}
