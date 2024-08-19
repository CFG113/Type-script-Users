import { createUser as createUserRepo, getUserByEmail, getUserByUsername } from '../repositories';
import { hashPassword, verifyPassword } from '../utils';
import { IUser } from '../interfaces';

export class AuthService {

    // Create a new user with a hashed password
    async createUser(data: Partial<IUser>): Promise<IUser> {
        try {
            const password = data.authentication?.password;
            if (!password) {
                throw new Error('Password is required');
            }

            // Hash the user's password before saving
            const hashedPassword = await hashPassword(password);

            // Create the user in the database
            const user = await createUserRepo({
                ...data,
                authentication: { password: hashedPassword },
            } as IUser);

            
            const { authentication, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword as IUser;
            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to create user: ${error.message}`, error.stack); // Log detailed error
                throw new Error(`Failed to create user: ${error.message}`);
            } else {
                console.error('Failed to create user due to an unknown error', error); // Log unknown errors
                throw new Error('Failed to create user due to an unknown error');
            }
        }
    }

    // Log in a user with either username or email
    async loginUser(identifier: string, password: string): Promise<IUser> {
        try {
            // Try to find the user by email or username
            const user = await getUserByEmail(identifier) || await getUserByUsername(identifier);
            if (!user) {
                throw new Error('User not found');
            }

            // Verify the provided password
            const isPasswordValid = await verifyPassword(user.authentication.password, password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            // Update last login time
            user.lastLogin = new Date();
            await user.save();

            // Return user object without the authentication field
            const { authentication, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword as IUser;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Login failed: ${error.message}`);
            } else {
                throw new Error('Login failed due to an unknown error');
            }
        }
    }
}
