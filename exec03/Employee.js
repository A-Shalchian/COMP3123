//Employee Module - Contains employee data and helper functions

const employees = [
    {id: 1, firstName: "Pritesh", lastName: "Patel", email: "pritesh@gmail.com", Salary:5000},
    {id: 2, firstName: "Krish", lastName: "Lee", email: "krish@gmail.com", Salary:4000},
    {id: 3, firstName: "Racks", lastName: "Jacson", email: "racks@gmail.com", Salary:5500},
    {id: 4, firstName: "Denial", lastName: "Roast", email: "denial@gmail.com", Salary:9000}
]

// Get all employees
const getAllEmployees = () => {
    return employees;
}

// Get employee names in ascending order
const getEmployeeNames = () => {
    return employees
        .map(emp => `${emp.firstName} ${emp.lastName}`)
        .sort();
}

// Get total salary of all employees
const getTotalSalary = () => {
    return employees.reduce((total, emp) => total + emp.Salary, 0);
}

// Export functions and data
module.exports = {
    employees,
    getAllEmployees,
    getEmployeeNames,
    getTotalSalary
}