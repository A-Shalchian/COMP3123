const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: 'Validation failed', errors: errors.array() });
        }

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ status: false, message: 'User with this email or username already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully.', user_id: newUser._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error during signup' });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: 'Validation failed', errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username: email }] });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Invalid Username and password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: 'Invalid Username and password' });
        }

        const token = jwt.sign(
            { user_id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful.',
            token,
            user_id: user._id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error during login' });
    }
};
