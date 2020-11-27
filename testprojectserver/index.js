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
app.use(express.static(path.join(__dirname, './assets/abilities')));


const hostname = '127.0.0.1';
const port = 3000;

const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('../testprojectweb/build'));

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "mypw",
  database: "finalProject",
  connectionLimit: 1
});
console.log("Connecting to MySql Database...");
module.exports = con;
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
    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT * FROM CharactersID ORDER BY characterName ASC', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Title/:name', function (req, res) {
    // Connecting to the database.

    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT title FROM Titles WHERE id = (SELECT id from CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ')' , function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/fileNames', function (req, res) {
    // Connecting to the database.
    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT fileName FROM fileNames ORDER BY fileName ASC', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Ability/:name', function (req, res) {
    // Connecting to the database.
    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT ability, abilityFile, abilityCooldown, abilityDescription, abilityMath FROM Abilities WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ') ORDER BY letter ASC;', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Stats/:name', function (req, res) {
    // Connecting to the database.
    // Executing the MySQL query (select all data from the 'users' table).
    con.query('SELECT HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR FROM Stats WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ');', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
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
