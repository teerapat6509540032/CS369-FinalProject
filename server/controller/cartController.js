import Cart from "../model/cart.js";
import Design from "../model/design.js";
import jwt from "jsonwebtoken";

export const addToCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Product ID and quantity are required' });
        }

        let cart = await Cart.findOne({ userId: decoded.id });
        if (!cart) {
            cart = new Cart({ userId: decoded.id, products: [] });
        }

        const product = await Design.findOne({ productId });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingProduct = cart.products.findIndex(p => p.productId === productId);   
        if (existingProduct > -1) {
            cart.products[existingProduct].quantity += Number(quantity);
        } else {
            cart.products.push({ product, productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const cart = await Cart.findOne({ userId: decoded.id }).populate('products.product');
        if (!cart) {
            return res.status(200).json({ products: [] });
        }

        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { productId } = req.params;
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        const cart = await Cart.findOne({ userId: decoded.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.productId !== productId);
        await cart.save();

        res.status(200).json(cart);
    }
    catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const clearCart = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        await Cart.findOneAndDelete({ userId: decoded.id });
        res.status(200).json({ message: 'Cart cleared successfully' });
    }
    catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}