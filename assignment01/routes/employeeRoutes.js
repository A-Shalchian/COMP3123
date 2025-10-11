const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const employeeController = require('../controllers/employeeController');

// Validation rules for creating employee
const createEmployeeValidation = [
    body('first_name')
        .trim()
        .notEmpty().withMessage('First name is required'),
    body('last_name')
        .trim()
        .notEmpty().withMessage('Last name is required'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address'),
    body('position')
        .trim()
        .notEmpty().withMessage('Position is required'),
    body('salary')
        .notEmpty().withMessage('Salary is required')
        .isNumeric().withMessage('Salary must be a number')
        .custom(value => value >= 0).withMessage('Salary must be a positive number'),
    body('date_of_joining')
        .notEmpty().withMessage('Date of joining is required')
        .isISO8601().withMessage('Please provide a valid date'),
    body('department')
        .trim()
        .notEmpty().withMessage('Department is required')
];

// Validation rules for updating employee (all fields optional)
const updateEmployeeValidation = [
    body('first_name')
        .optional()
        .trim()
        .notEmpty().withMessage('First name cannot be empty'),
    body('last_name')
        .optional()
        .trim()
        .notEmpty().withMessage('Last name cannot be empty'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Please provide a valid email address'),
    body('position')
        .optional()
        .trim()
        .notEmpty().withMessage('Position cannot be empty'),
    body('salary')
        .optional()
        .isNumeric().withMessage('Salary must be a number')
        .custom(value => value >= 0).withMessage('Salary must be a positive number'),
    body('date_of_joining')
        .optional()
        .isISO8601().withMessage('Please provide a valid date'),
    body('department')
        .optional()
        .trim()
        .notEmpty().withMessage('Department cannot be empty')
];

// GET /api/v1/emp/employees - Get all employees
router.get('/employees', employeeController.getAllEmployees);

// POST /api/v1/emp/employees - Create new employee
router.post('/employees', createEmployeeValidation, employeeController.createEmployee);

// GET /api/v1/emp/employees/:eid - Get employee by ID
router.get('/employees/:eid', employeeController.getEmployeeById);

// PUT /api/v1/emp/employees/:eid - Update employee
router.put('/employees/:eid', updateEmployeeValidation, employeeController.updateEmployee);

// DELETE /api/v1/emp/employees?eid=xxx - Delete employee
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;
