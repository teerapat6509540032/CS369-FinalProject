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


// User login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // บันทึก token ลงใน user
        user.tokens = user.tokens || [];
        user.tokens.push(token);
        await user.save();
        
        res.status(200).json({ token, user: { id: user._id, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.tokens = user.tokens.filter(t => t !== token);
    await user.save();

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error });
  }
};