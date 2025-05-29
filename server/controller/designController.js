import Design from "../model/design.js";
import Counter from "../model/counter.js";
import jwt from "jsonwebtoken";

const generateProductId = async (category) => {
    const counter = await Counter.findOneAndUpdate(
        { category },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    if (!counter) {
        throw new Error('Failed to generate product ID');
    }
    return `${category}${counter.seq}`;
}

export const createDesign = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const { name, designData, category, price } = req.body;
        if (!designData || !price || !category || !name) {
            return res.status(400).json({ message: 'Invalid design data' });
        }

        const productId = await generateProductId(category);

        const newDesign = new Design({
            userId: decoded.id,
            productId,
            name,
            designData,
            category,
            price
        });

        await newDesign.save();
        res.status(201).json(newDesign);
    }
    catch (error) {
        console.error('Error creating design:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteDesign = async (req, res) => {
    try {
        const { id } = req.params;
        const design = await Design.findByIdAndDelete(id);
        if (!design) {
            return res.status(404).json({ message: 'Design not found' });
        }
        res.status(200).json({ message: 'Design deleted successfully' });
    } catch (error) {
        console.error('Error deleting design:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const getAllDesigns = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const designs = await Design.find({ userId: decoded.id });
        res.status(200).json(designs);
    } catch (error) {
        console.error('Error fetching all designs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
