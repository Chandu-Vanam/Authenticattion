import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const db = process.env.MONGO_URL;

const connectDB = async (db) => {
  try {       
    await mongoose.connect(db, {});
    console.log('database connected successfully');
    } catch (error) {
        console.log(error); 
    }
}

export default connectDB;