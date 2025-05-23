import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { mongooseConnect } from './config/mongooseConfig';
import joiErrorHandler from './handlers/JoiErrorHandler';
import customErrorHandler from './handlers/CustomErrorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use(joiErrorHandler);
app.use(customErrorHandler);
import AuthRoutes from './routes/user.routes';
import BlogRoutes from './routes/blog.routes';

app.use('/api/auth', AuthRoutes);
app.use('/api/blog', BlogRoutes);

(async () => {
    try {
        await mongooseConnect();
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
})();
app.listen(port, async () => {
    console.log(`server started at ${port}`);
});