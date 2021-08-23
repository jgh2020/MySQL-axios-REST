// express 모듈 호출
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const fs = require('fs');
const { Server } = require('http');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded());

app.get('/api/data', (req,res) => {
    connection.query(
        "Select * from testlist where isDeleted = 0",
        (err, rows, fields) => {
            if (err) {
                console.log(err);
              } else {
                res.send(rows);
              }
        }
    );
})

app.post('/api/data', (req,res) => {
    let postQuery = "INSERT INTO testlist VALUES (null, ?, ?, ?, ?, ?)";
    let eng = req.body.engword;
    let kor = req.body.korword;
    let cDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let dDate = null;
    let isDel = 0;
    let params = [eng, kor, cDate, dDate, isDel];

    connection.query(postQuery, params,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(rows);
            }
        }
    );
})

app.put('/api/data/:id', (req,res) => {

    let putQuery = "UPDATE testlist SET engword = ?, korword = ? WHERE id = ?";
    let eng = req.body.engword;
    let kor = req.body.korword;
    let updateid = req.params.id;
    let params = [eng, kor, updateid];

    connection.query(putQuery, params,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(rows);
            }
        }
    );
})

app.delete('/api/data/:id', (req,res) => {
    // res.send();
    let deleteQuery = "Update testlist set isDeleted = 1, deletedDate = ? where id = ?";
    let dDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let deleteId = req.params.id;
    let params = [dDate, deleteId];
    connection.query(deleteQuery, params,
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            } else {
                res.send(rows);
            }
        }
    );
})

app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

//npm install express --save

// npm install mysql

// nodemon 설치하면 node서버 리로드 쉽게 할 수 있음
// 설치 : npm install -g nodemon
// 설치 후 : node 대신, nodemon Server.js
