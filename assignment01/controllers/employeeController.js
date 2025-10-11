const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();

        // Format response to match expected output
        const formattedEmployees = employees.map(emp => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department
        }));

        res.status(200).json(formattedEmployees);
    } catch (error) {
        console.error('Get all employees error:', error);
        res.status(500).json({
            status: false,
            message: 'Server error while fetching employees'
        });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        // Check if employee with email already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({
                status: false,
                message: 'Employee with this email already exists'
            });
        }

        // Create new employee
        const newEmployee = new Employee({
            first_name,
            last_name,
            email,
            position,
            salary,
            date_of_joining,
            department
        });

        await newEmployee.save();

        res.status(201).json({
            message: 'Employee created successfully.',
            employee_id: newEmployee._id
        });

    } catch (error) {
        console.error('Create employee error:', error);
        res.status(500).json({
            status: false,
            message: 'Server error while creating employee'
        });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        // Format response to match expected output
        const formattedEmployee = {
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        };

        res.status(200).json(formattedEmployee);

    } catch (error) {
        console.error('Get employee by ID error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }
        res.status(500).json({
            status: false,
            message: 'Server error while fetching employee'
        });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const updateData = req.body;
        updateData.updated_at = Date.now();

        const employee = await Employee.findByIdAndUpdate(
            req.params.eid,
            updateData,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.'
        });

    } catch (error) {
        console.error('Update employee error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }
        res.status(500).json({
            status: false,
            message: 'Server error while updating employee'
        });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.eid;

        if (!employeeId) {
            return res.status(400).json({
                status: false,
                message: 'Employee ID is required'
            });
        }

        const employee = await Employee.findByIdAndDelete(employeeId);

        if (!employee) {
            return res.status(404).json({
                status: false,
                message: 'Employee not found'
            });
        }

        res.status(204).send();

    } catch (error) {
        console.error('Delete employee error:', error);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                status: false,
                message: 'Invalid employee ID'
            });
        }
        res.status(500).json({
            status: false,
            message: 'Server error while deleting employee'
        });
    }
};
