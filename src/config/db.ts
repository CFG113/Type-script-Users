import mongoose from 'mongoose';
import { MONGO_URL } from './index';

mongoose.Promise = global.Promise;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
};

export default connectDB;
