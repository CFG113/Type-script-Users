import dotenv from 'dotenv';

dotenv.config();

// Export all necessary configuration variables
export const MONGO_URL = process.env.MONGO_URL as string;
