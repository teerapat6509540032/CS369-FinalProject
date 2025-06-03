import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';

let router = express.Router();

router.post('/addToCart', addToCart);
router.get('/getCart', getCart);
router.delete('/removeFromCart/:productId', removeFromCart);

export default router;