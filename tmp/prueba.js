var mysql = require('mysql');
var dataBase = require('./dataBase.json');

var connection = mysql.createConnection({
  host     : dataBase.dbHost,
  user     : dataBase.dbUser,
  password : dataBase.dbPassword,
  database : dataBase.dbDatabase
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;

  console.log('The solution is: ', rows[0].solution);
});
