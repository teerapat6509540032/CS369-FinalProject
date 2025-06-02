import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import * as mongooseDef from 'mongoose';
import bodyParser from 'body-parser';
import {config} from './config/dbConfig.js';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import designRoutes from './routes/designRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

var app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/mockups', express.static('mockups'));
app.use('/uploads', express.static('uploads'));

let mongoose = mongooseDef.default;
mongoose.connect(config.database, config.connectOptions);
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', () => { console.log('Database error'); });

// REST for products
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/design', designRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);

// Start server
app.listen(PORT, function(){
    console.log(`start http server on ${PORT}`);
});