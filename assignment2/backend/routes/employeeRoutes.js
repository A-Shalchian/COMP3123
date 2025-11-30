const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController');
const upload = require('../config/upload');

const createValidation = [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
    body('position').trim().notEmpty().withMessage('Position is required'),
    body('salary').notEmpty().withMessage('Salary is required'),
    body('date_of_joining').notEmpty().withMessage('Date of joining is required'),
    body('department').trim().notEmpty().withMessage('Department is required')
];

const updateValidation = [
    body('first_name').optional().trim().notEmpty(),
    body('last_name').optional().trim().notEmpty(),
    body('email').optional().trim().isEmail(),
    body('position').optional().trim().notEmpty(),
    body('salary').optional(),
    body('date_of_joining').optional(),
    body('department').optional().trim().notEmpty()
];

router.get('/employees/search', employeeController.searchEmployees);
router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', upload.single('profile_picture'), createValidation, employeeController.createEmployee);
router.get('/employees/:eid', employeeController.getEmployeeById);
router.put('/employees/:eid', upload.single('profile_picture'), updateValidation, employeeController.updateEmployee);
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;
