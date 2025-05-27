import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {config} from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';

var app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(config.database, config.connectOptions)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// REST for products
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, function(){
    console.log(`start http server on ${PORT}`);
});