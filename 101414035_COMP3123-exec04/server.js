const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
    res.send('Hello Express JS');
});

app.get('/user', (req, res) => {
    const { firstname = 'Pritesh', lastname = 'Patel' } = req.query;
    res.json({ firstname, lastname });
});

app.post('/user/:firstname/:lastname', (req, res) => {
    const { firstname, lastname } = req.params;
    res.json({ firstname, lastname });
});

app.post('/users', (req, res) => {
    const defaultUsers = [
        { firstname: 'Pritesh', lastname: 'Patel' },
        { firstname: 'John', lastname: 'Doe' },
        { firstname: 'John', lastname: 'Rome' }
    ];

    const users = (req.body && req.body.users) ? req.body.users : defaultUsers;
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});