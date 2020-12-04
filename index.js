const http = require('http');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
app.enable('trust proxy');

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
const pool = new pg.Pool(process.env.DATABASE_URL);

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


app.get('/charactersID', function (req, res) {
    // Connecting to the database.
    con.query('SELECT * FROM CharactersID ORDER BY characterName ASC', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/title/:name', function (req, res) {
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
    pool.connect(function (err, client, done) {
      if (err) {
        console.log("can not connect to db: " + err);
      }
      client.query('SELECT fileName FROM fileNames ORDER BY fileName ASC', function (error, results) {
        // If some error occurs, we throw an error.
        done();
        if (error) throw error;
  
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results.rows);
    });
    })
});

app.get('/ability/:name', function (req, res) {
    // Connecting to the database.
    con.query('SELECT ability, abilityFile, abilityCooldown, abilityDescription, abilityMath FROM Abilities WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ') ORDER BY letter ASC;', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
  });
});

app.get('/stats/:name', function (req, res) {
    // Connecting to the database.
    con.query('SELECT HP, HPR, MP, MPR, MS, AD, attackSpeed, RNG, AR, MR FROM Stats WHERE characterID IN (SELECT id FROM CharactersID WHERE characterName = ' + '"' + req.params.name + '"' + ');', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
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
    console.log(process.env.DATABASE_UR);
})
