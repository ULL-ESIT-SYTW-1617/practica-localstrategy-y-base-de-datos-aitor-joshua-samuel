var mysql = require('mysql');
var dataBase = require('./dataBase.json');

var connection = mysql.createConnection({
    host: dataBase.dbHost,
    user: dataBase.dbUser,
    password: dataBase.dbPassword,
    database: dataBase.dbDatabase
});

connection.connect();

connection.query("SELECT * FROM login WHERE id = '1'", function(err, rows, fields) {

    if (err) {
        console.log(err);
    }
    console.log(rows[0]);
});
connection.query("SELECT * FROM login WHERE name = 'admin'", function(err, rows, fields) {

    if (err) {
        console.log(err);
    }
    console.log(rows[0]);
});
