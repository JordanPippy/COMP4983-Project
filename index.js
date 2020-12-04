const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
app.enable('trust proxy');
require('dotenv').config({path: __dirname + '/.env'})
app.use(cors());
app.use(express.static(path.join(__dirname, './build')));
app.use(express.static(path.join(__dirname, './assets/champions')));
app.use(express.static(path.join(__dirname, './assets/abilities')));


const hostname = process.env.JAWSDB_URL;
const port = process.env.PORT;

//const mysql = require('mysql');

const pg = require('pg');

/*
const con = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

con.connect();
*/

//const con = mysql.createConnection(process.env.JAWSDB_URL);

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('./testprojectweb/build'));


let connString = process.env.DATABASE_URL;

const { Pool } = require('pg');
console.log("before connection");
const pool = new Pool({
  connectionString : connString,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = {pool};
console.log("after connection");

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


app.get('/charactersID', function (req, res) {
    // Connecting to the database.
    pool.query('SELECT * FROM CharactersID ORDER BY characterName ASC', function (error, results) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/title/:name', function (req, res) {
    // Connecting to the database.
    const name = req.params.name;
    //pool.query('SELECT title FROM titles WHERE id = (SELECT id from CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ')' , function (error, results) {
      pool.query('SELECT title FROM titles WHERE id = (SELECT id from CharactersID WHERE characterName = $1)', [name] , function (error, results) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results.rows);
  });
});


app.get('/fileNames', function (req, res) {
    // Connecting to the database.
      pool.query('SELECT fileName FROM fileNames ORDER BY fileName ASC', function (error, results) {
        // If some error occurs, we throw an error.
       // done();
        if (error) throw error;
  
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        console.log(results.rows);
        res.send(results.rows);
    });
});

app.get('/ability/:name', function (req, res) {
    const name = req.params.name;
    // Connecting to the database.
    //pool.query('SELECT ability, abilityFile, abilityCooldown, abilityDescription, abilityMath FROM abilities WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ') ORDER BY letter ASC;', function (error, results) {
      pool.query('SELECT ability, abilityFile, abilityCooldown, abilityDescription, abilityMath FROM abilities WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = $1) ORDER BY letter ASC;', [name], function (error, results) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results.rows);
  });
});

app.get('/stats/:name', function (req, res) {
      const name = req.params.name;
    // Connecting to the database.
    //pool.query('SELECT HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR FROM Stats WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ');', function (error, results) {
      pool.query('SELECT HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR FROM Stats WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = $1);', [name], function (error, results) {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results.rows);
  });
});


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: "./testprojectweb/build" });
})

app.get('*', function (req, res) {
    console.log(req.url);
})

app.listen(port, function () {
    console.log('The server running on Port '+ port);
    console.log('Dirname: ' + __dirname);
    console.log(process.env.DATABASE_URL);
})
