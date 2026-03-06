const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check for user
        const user = await User.findOne({ username });

        // Assuming plain text password per your instructions ("password for TL login", "username: admin, password: admin"). 
        // In production we should use bcrypt.
        if (user && user.password === password) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { loginUser };
