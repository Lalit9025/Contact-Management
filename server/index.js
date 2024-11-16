import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'
import contactRoutes from './Routes/contactRoutes.js'

dotenv.config();

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/api/v1', contactRoutes)

const PORT = 8080;

app.get('/', async(req, res) => {
    res.send("Hello, How are you?");
})

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`);
})