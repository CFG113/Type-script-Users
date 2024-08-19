import argon2 from 'argon2';

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await argon2.hash(password);
    } catch (err) {
        throw new Error('Error hashing password');
    }
};

export const verifyPassword = async (hashedPassword: string, password: string): Promise<boolean> => {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (err) {
        console.error('Error verifying password:', err);
        throw new Error('Error verifying password');
    }
};
