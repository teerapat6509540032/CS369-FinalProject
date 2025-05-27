import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};


// Get user profile
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // บันทึก token ลงใน user
        user.tokens = user.tokens || [];
        user.tokens.push(token);
        await user.save();

        res.status(200).json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
