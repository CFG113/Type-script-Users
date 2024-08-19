import argon2 from 'argon2';

export const hashPassword = async (password: string) => {
    try {
        return await argon2.hash(password);
    } catch (error: unknown) {
        throw new Error('Error hashing password');
    }
};

export const verifyPassword = async (hashedPassword: string, password: string) => {
    try {
        return await argon2.verify(hashedPassword, password);
    } catch (error: unknown) {
        throw new Error('Error verifying password');
    }
};
