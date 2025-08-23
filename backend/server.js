import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

//app config
const app = express();
const port = process.env.PORT || 4000;
ConnectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors({
  origin: [
    "https://quickmed-frontend.onrender.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));
app.options("*", cors());

//api endpoint
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/', (req, res) => res.status(200).send('Hello World 1'));

//listen
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
