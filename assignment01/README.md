# COMP3123 Assignment 1 - Employee Management API

## Description
A RESTful API backend application for Employee Management System built with Node.js, Express, and MongoDB. This application provides endpoints for user authentication and employee CRUD operations.

## Technologies Used
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- bcryptjs (for password hashing)
- express-validator (for input validation)

## Project Structure
```
assignment01/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   ├── userController.js     # User authentication logic
│   └── employeeController.js # Employee CRUD operations
├── models/
│   ├── User.js              # User schema
│   └── Employee.js          # Employee schema
├── routes/
│   ├── userRoutes.js        # User routes
│   └── employeeRoutes.js    # Employee routes
├── .env                     # Environment variables
├── server.js               # Main application file
└── package.json            # Project dependencies
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB installation)

### Steps to Run

1. Clone the repository:
```bash
git clone <repository-url>
cd assignment01
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the root directory with:
```
DB_URL=your_mongodb_connection_string
PORT=3000
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### User Management

#### 1. User Signup
- **Endpoint**: `POST /api/v1/user/signup`
- **Description**: Create a new user account
- **Request Body**:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response** (201):
```json
{
  "message": "User created successfully.",
  "user_id": "64c9e5a3d9f3c1a5c9b4e8a1"
}
```

#### 2. User Login
- **Endpoint**: `POST /api/v1/user/login`
- **Description**: Authenticate user
- **Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
- **Response** (200):
```json
{
  "message": "Login successful.",
  "user_id": "64c9e5a3d9f3c1a5c9b4e8a1",
  "username": "johndoe"
}
```

### Employee Management

#### 3. Get All Employees
- **Endpoint**: `GET /api/v1/emp/employees`
- **Description**: Retrieve all employees
- **Response** (200):
```json
[
  {
    "employee_id": "64c9e5a3d9f3c1a5c9b4e8a2",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "position": "Software Engineer",
    "salary": 90000,
    "date_of_joining": "2023-08-01T00:00:00.000Z",
    "department": "Engineering"
  }
]
```

#### 4. Create Employee
- **Endpoint**: `POST /api/v1/emp/employees`
- **Description**: Create a new employee
- **Request Body**:
```json
{
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10",
  "department": "Design"
}
```
- **Response** (201):
```json
{
  "message": "Employee created successfully.",
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4"
}
```

#### 5. Get Employee by ID
- **Endpoint**: `GET /api/v1/emp/employees/:eid`
- **Description**: Get a specific employee by ID
- **Response** (200):
```json
{
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4",
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
```

#### 6. Update Employee
- **Endpoint**: `PUT /api/v1/emp/employees/:eid`
- **Description**: Update employee details
- **Request Body** (partial update supported):
```json
{
  "position": "Senior Designer",
  "salary": 95000
}
```
- **Response** (200):
```json
{
  "message": "Employee details updated successfully."
}
```

#### 7. Delete Employee
- **Endpoint**: `DELETE /api/v1/emp/employees?eid=xxx`
- **Description**: Delete an employee by ID
- **Response** (204): No content

## Error Response Format
```json
{
  "status": false,
  "message": "Error description"
}
```

## Sample Test User
For testing purposes, you can use:
- **Username**: `testuser`
- **Email**: `testuser@example.com`
- **Password**: `test123456`

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  created_at: Date,
  updated_at: Date
}
```

### Employees Collection
```javascript
{
  _id: ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  position: String,
  salary: Number,
  date_of_joining: Date,
  department: String,
  created_at: Date,
  updated_at: Date
}
```

## Features
- Password hashing using bcryptjs
- Input validation using express-validator
- Proper error handling and status codes
- RESTful API design principles
- MongoDB integration with Mongoose ODM
- Modular code structure (MVC pattern)

## Testing
Use Postman or any API testing tool to test the endpoints. Make sure to:
1. Start with user signup to create an account
2. Login with the created user
3. Test all employee CRUD operations
4. Verify proper error responses for invalid inputs

## Author
Ryan DeBarros

## License
ISC
