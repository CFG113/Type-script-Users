import { createUser as createUserRepo, getUserByEmail, getUserByUsername } from '../repositories';
import { hashPassword, verifyPassword } from '../utils';
import { IUser } from '../interfaces';

export class AuthService {

    async createUser(data: Partial<IUser>) {
        try {
            const password = data.password;
            if (!password) {
                throw new Error('Password is required');
            }

            const hashedPassword = await hashPassword(password);
            const user = await createUserRepo({
                ...data,
                password: hashedPassword,
            } as IUser);

            const { password: _, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create user: ${error.message}`);
            }
            throw new Error('Failed to create user due to an unknown error');
        }
    }

    async loginUser(identifier: string, password: string) {
        try {
            const user = await getUserByEmail(identifier) || await getUserByUsername(identifier);
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordValid = await verifyPassword(user.password, password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            user.lastLogin = new Date();
            await user.save();

            const { password: hashedPassword, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
            
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            }
            throw new Error('Login failed due to an unknown error');
        }
    }
}
