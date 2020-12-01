const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './assets/champions')));
app.use(express.static(path.join(__dirname, './assets/abilities')));


const hostname = process.env.JAWSDB_URL;
const port = process.env.PORT;

const mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('./testprojectweb/build'));
/*
const con = mysql.createPool({
  host: process.env.JAWSDB_URL,
  user: "e846nrnb17zvxmo8",
  password: "mjxnpkmrqx3wudmt",
  database: "du7bw2qg8ts4oxmj",
  connectionLimit: 10
});
module.exports = con;
*/
const con = mysql.createConnection(process.env.JAWSDB_URL);

app.get('/CharactersID', function (req, res) {
    // Connecting to the database.

    con.query('SELECT * FROM CharactersID ORDER BY characterName ASC', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Title/:name', function (req, res) {
    // Connecting to the database.
    con.query('SELECT title FROM Titles WHERE id = (SELECT id from CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ')' , function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/fileNames', function (req, res) {
    // Connecting to the database.
    con.query('SELECT fileName FROM fileNames ORDER BY fileName ASC', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Ability/:name', function (req, res) {
    // Connecting to the database.
    con.query('SELECT ability, abilityFile, abilityCooldown, abilityDescription, abilityMath FROM Abilities WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ') ORDER BY letter ASC;', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/Stats/:name', function (req, res) {
    // Connecting to the database.
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
    con.query('SELECT * FROM CharactersID ORDER BY characterName ASC limit 5', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      console.log(results);
  });
})
