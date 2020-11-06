const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();


app.use(express.static(path.join(__dirname, '../build')));


const hostname = '127.0.0.1';
const port = 3000;

const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('../testprojectweb/build'));

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mypw",
  database: "finalProject"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql");
  sql = "SELECT * FROM fileNames";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result[0].fileName);
  });
});

app.get('/fp', function (req, res) {
    res.sendFile('notindex0.html', { root: "./public" });
    console.log("We got a fp GET request");
})

app.get('/react', function (req, res) {
    res.sendFile('index.js', { root: "./src" });
    console.log("We got a react GET request");
})


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: "../testprojectweb/build" });
})


/*
app.get('*', function (req, res) {
    console.log(req.url);
    res.sendFile(req.url, {root: "./build"});
})
*/



app.listen(port, function () {
    console.log('The server running on Port '+ port);
    console.log('Dirname: ' + __dirname);
})
