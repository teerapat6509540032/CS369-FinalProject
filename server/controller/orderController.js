import Order from '../model/order.js';
import Design from '../model/design.js';
import jwt from 'jsonwebtoken';

const generateOrderID = async () => {
    const lastOrder = await Order.findOne().sort({ orderID: -1 });
    return lastOrder ? lastOrder.orderID + 1 : 1;
}

export const createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const orderID = await generateOrderID();
        if (!orderID) {
            return res.status(500).json({ message: 'Failed to generate order ID' });
        }

        let { productId, quantity } = req.body;
        if (!productId || !quantity) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        if (!Array.isArray(productId)) {
            productId = [productId];
        }

        if (!Array.isArray(quantity)) {
            quantity = [quantity];
        }

        const products = await Promise.all(
            productId.map(async (id,idx) => {
                const product = await Design.findOne({productId: id});
                if (!product) throw new Error(`Design not found: ${id}`);
                return {
                    product: product._id,
                    quantity: quantity[idx]
                };
            })
        );

        const newOrder = new Order({
            userID: decoded.id,
            orderID,
            products,
            orderStatus: 'Pending'
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrderHistory = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const orders = await Order.find({ userID: decoded.id })
            .populate('products.product')
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }   
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        const orderId = req.params.id;
        const order = await Order.find
            ({ orderID: orderId, userID: decoded.id })
            .populate('products.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}