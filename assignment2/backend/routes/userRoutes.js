const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/userController');

const signupValidation = [
    body('username').trim().notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
    body('email').trim().notEmpty().withMessage('Email or username is required'),
    body('password').notEmpty().withMessage('Password is required')
];

router.post('/signup', signupValidation, userController.signup);
router.post('/login', loginValidation, userController.login);

module.exports = router;
