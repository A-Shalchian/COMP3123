var http = require("http");
//Import Employee Module
const employeeModule = require('./Employee');
console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            //Display welcome message
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
            return;
        }

        if (req.url === '/employee') {
            //Display all details for employees in JSON format
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(employeeModule.getAllEmployees()));
            return;
        }

        if (req.url === '/employee/names') {
            //Display only all employees {first name + lastname} in Ascending order in JSON Array
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(employeeModule.getEmployeeNames()));
            return;
        }

        if (req.url === '/employee/totalsalary') {
            //Display Sum of all employees salary in given JSON format
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ "total_salary": employeeModule.getTotalSalary() }));
            return;
        }

        // 404 for unmatched routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})