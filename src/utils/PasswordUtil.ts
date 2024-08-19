import argon2 from 'argon2';

export const hashPassword = async (password: string) => {
    try {
        return argon2.hash(password); 
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

export const verifyPassword = async (hashedPassword: string, password: string) => {
    try {
        return argon2.verify(hashedPassword, password);
    } catch (error) {
        throw new Error('Error verifying password');
    }
};
