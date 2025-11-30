const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        const formattedEmployees = employees.map(emp => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department,
            profile_picture: emp.profile_picture
        }));
        res.status(200).json(formattedEmployees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while fetching employees' });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const { department, position } = req.query;
        let query = {};
        if (department) query.department = { $regex: department, $options: 'i' };
        if (position) query.position = { $regex: position, $options: 'i' };

        const employees = await Employee.find(query);
        const formattedEmployees = employees.map(emp => ({
            employee_id: emp._id,
            first_name: emp.first_name,
            last_name: emp.last_name,
            email: emp.email,
            position: emp.position,
            salary: emp.salary,
            date_of_joining: emp.date_of_joining,
            department: emp.department,
            profile_picture: emp.profile_picture
        }));
        res.status(200).json(formattedEmployees);
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while searching employees' });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: 'Validation failed', errors: errors.array() });
        }

        const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ status: false, message: 'Employee with this email already exists' });
        }

        const employeeData = { first_name, last_name, email, position, salary, date_of_joining, department };

        if (req.file) {
            const base64 = req.file.buffer.toString('base64');
            employeeData.profile_picture = `data:${req.file.mimetype};base64,${base64}`;
        }

        const newEmployee = new Employee(employeeData);
        await newEmployee.save();

        res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while creating employee' });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department,
            profile_picture: employee.profile_picture
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while fetching employee' });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: false, message: 'Validation failed', errors: errors.array() });
        }

        const updateData = { ...req.body };
        updateData.updated_at = Date.now();

        if (req.file) {
            const base64 = req.file.buffer.toString('base64');
            updateData.profile_picture = `data:${req.file.mimetype};base64,${base64}`;
        }

        const employee = await Employee.findByIdAndUpdate(req.params.eid, updateData, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({
            message: 'Employee details updated successfully.',
            employee: {
                employee_id: employee._id,
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                position: employee.position,
                salary: employee.salary,
                date_of_joining: employee.date_of_joining,
                department: employee.department,
                profile_picture: employee.profile_picture
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while updating employee' });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.eid;
        if (!employeeId) {
            return res.status(400).json({ status: false, message: 'Employee ID is required' });
        }

        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) {
            return res.status(404).json({ status: false, message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Server error while deleting employee' });
    }
};
