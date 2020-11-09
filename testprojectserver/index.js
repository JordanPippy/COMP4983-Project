const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static(path.join(__dirname, './assets/champions')));


const hostname = '127.0.0.1';
const port = 3000;

const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('../testprojectweb/build'));

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mypw",
  database: "finalProject"
});

//module.exports = pool;
/*
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to mysql");
  sql = "SELECT * FROM fileNames";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result[0].fileName);
  });
});
*/


app.get('/CharactersID', function (req, res) {
    // Connecting to the database.
    con.getConnection(function (err, connection) {
        if (err)
            throw err;
        console.log("Mysql connection success.");

    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT * FROM CharactersID', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

app.get('/fileNames', function (req, res) {
    // Connecting to the database.
    con.getConnection(function (err, connection) {
        if (err)
            throw err;
        console.log("Mysql connection success.");

    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT fileName FROM fileNames', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: "../testprojectweb/build" });
})



app.get('*', function (req, res) {
    console.log(req.url);
})




app.listen(port, function () {
    console.log('The server running on Port '+ port);
    console.log('Dirname: ' + __dirname);
})
