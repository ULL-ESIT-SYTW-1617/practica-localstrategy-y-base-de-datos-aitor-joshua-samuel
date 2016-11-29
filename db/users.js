var json = require('json-update');
var bcrypt = require('bcrypt');
var fs = require('fs-extended');
var Fs = require('fs');
var mysql = require('mysql');
var dataBase = require('./dataBase.json');

var connection = mysql.createConnection({
    host: dataBase.dbHost,
    user: dataBase.dbUser,
    password: dataBase.dbPassword,
    database: dataBase.dbDatabase
});


exports.findById = (id, cb) => {
    process.nextTick(() => {
        connection.query("SELECT * FROM login WHERE id = '" + id + "'", (err, rows, fields) => {

            if (err) {
                console.log(err);
            }
            if (rows[0]) {
                cb(null, rows[0]);
            } else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });

    });
}

exports.findByUsername = (username, cb) => {
    process.nextTick(() => {
        connection.query("SELECT * FROM login WHERE name = '" + username + "'", (err, rows, fields) => {

            if (err) {
                console.log(err);
            }
            if (rows[0]) {
                cb(null, rows[0]);
            } else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });
    });
}

exports.changePassword = (username, password) => {
    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                connection.query("UPDATE login SET password = '" + hash + "'WHERE name = '" + username + "'", (err, result) => {
                    if (err) throw err;

                    console.log('changed ' + result.changedRows + ' rows');
                });
            }
        });
    });
}
