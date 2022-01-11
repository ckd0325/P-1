const express = require("express");
const path = require("path");
const mysql = require('mysql');

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '525252',
    database: 'users',
})

con.connect((err) => {
    if (err) throw err;
    console.log('Connected');
});

app.use(express.static(__dirname + "/front_end"));
app.use(express.json());

app.get("/", (req, res) => {
    console.log("success");
    res.sendFile(path.resolve("front_end", "index.html"));
});

app.post('/write-post', (req, res) => {
    console.log(req.body);
});

app.post('/sign-up-user', (req, res) => {
    console.log(req.body);
    const userInfo = req.body;
    con.query(`INSERT INTO users (id, password) VALUES(?, ?);`, [userInfo.id, ""],
        (err, result) => {
            if (err) throw err;
            console.log("User added.");
        });
});

app.listen(process.env.PORT || 8080, () => console.log("Server runing ..."));