import mongoose from 'mongoose';
import * as dotenv from 'dotenv';


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected')
    } catch (error) {
        console.error("Dtabase connection error:",error);
        process.exit(1);
    }
}

export default connectDB;