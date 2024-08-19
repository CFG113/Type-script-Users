import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDB from './config/db';
import { errorHandler } from './utils';
import helmet from 'helmet';
import morgan from 'morgan';
import { userRoutes, authRoutes } from './routes';

const app = express();

connectDB();

app.use(cors({
    credentials: true,
}));

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use(errorHandler);

// Start the server
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080/');
});

