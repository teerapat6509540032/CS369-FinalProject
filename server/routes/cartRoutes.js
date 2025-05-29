import express from 'express';
import { addToCart, getCart, removeFromCart, clearCart } from '../controller/cartController.js';

let router = express.Router();

router.post('/addToCart', addToCart);
router.get('/getCart', getCart);
router.delete('/removeFromCart/:productId', removeFromCart);
router.delete('/clearCart', clearCart);

export default router;