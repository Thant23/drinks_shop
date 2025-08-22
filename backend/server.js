import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/products', productRoutes);

const PORT = 5000;

const mongoURL = "mongodb://127.0.0.1:27017/drinks_shop"; 

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})
