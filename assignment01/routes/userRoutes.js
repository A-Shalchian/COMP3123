const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

// Validation rules for signup
const signupValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Validation rules for login
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email or username is required'),
    body('password')
        .notEmpty().withMessage('Password is required')
];

// POST /api/v1/user/signup - Create new user
router.post('/signup', signupValidation, userController.signup);

// POST /api/v1/user/login - User login
router.post('/login', loginValidation, userController.login);

module.exports = router;
