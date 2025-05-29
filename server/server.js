import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {config} from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import designRoutes from './routes/designRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

var app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(config.database, config.connectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// REST for products
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/design', designRoutes);
app.use('/api/order', orderRoutes);

// Start server
app.listen(PORT, function(){
    console.log(`start http server on ${PORT}`);
});