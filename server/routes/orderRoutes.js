import express from 'express';
import { createOrder, getOrderHistory, getOrderById } from '../controller/orderController.js';

let router = express.Router();

router.post('/createOrder', createOrder);
router.get('/getOrderHistory', getOrderHistory);
router.get('/getOrder/:id', getOrderById);

export default router;
