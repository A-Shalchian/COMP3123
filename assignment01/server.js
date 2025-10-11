const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Employee Management API',
        version: '1.0.0',
        endpoints: {
            user: {
                signup: 'POST /api/v1/user/signup',
                login: 'POST /api/v1/user/login'
            },
            employee: {
                getAll: 'GET /api/v1/emp/employees',
                create: 'POST /api/v1/emp/employees',
                getById: 'GET /api/v1/emp/employees/:eid',
                update: 'PUT /api/v1/emp/employees/:eid',
                delete: 'DELETE /api/v1/emp/employees?eid=xxx'
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        status: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
