const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Set up MySQL connection
const db = mysql.createConnection({
    host: 'http://database1.c1pwkpkemkor.eu-north-1.rds.amazonaws.com/',
    user: 'root',
    password: '11111111',
    database: 'database1'
});

db.connect();

// Routes
app.get('/getData', (req, res) => {
    db.query('SELECT * FROM users', (err, data) => {
        if(err) throw err;
        res.send(data);
    });
});

app.post('/setData', (req, res) => {
    const { name, mobile } = req.body;
    db.query('INSERT INTO users (name, mobile) VALUES (?, ?)', [name, mobile], (err, result) => {
        if(err) throw err;
        res.send('Data inserted.');
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
