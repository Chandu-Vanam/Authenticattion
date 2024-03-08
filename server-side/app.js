import dotenv from 'dotenv';
import connectDB from './db/connect.js'
import express from "express";
import cors from 'cors';
import router from './routes/user.js'

const app = express();

dotenv.config();
app.use(express.json());

app.use(cors())
app.use("/api/v1", router);

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

