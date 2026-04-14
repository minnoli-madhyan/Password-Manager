import express from 'express'
import cors from "cors"
import "dotenv/config"
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'

import authRoutes from './routes/authRoutes.js';
import vaultRoutes from './routes/vaultRoutes.js';

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api endpoints
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);

app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port, ()=> console.log("Server Started", port))