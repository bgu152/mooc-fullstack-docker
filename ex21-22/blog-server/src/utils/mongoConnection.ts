import mongoose from 'mongoose';
const url = process.env.MONGO_URL;
import { DB_NAME } from './config';
mongoose.set('strictQuery', true);
const connectDB = async () => {
    console.log('database url: url');
    if (!url) {
        throw 'no database url';
    }
    try {
        mongoose.connect(url, {
            dbName: DB_NAME,
        });
    } catch (err) {
        console.error(err);
    }
};
export default connectDB;
