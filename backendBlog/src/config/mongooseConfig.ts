import mongoose from 'mongoose';
import * as process from 'process';

require('dotenv').config();

export const mongooseConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('\x1b[32m%s\x1b[0m', 'Database Connected successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err;
    }
};
