var inquirer = require('inquirer');
var fs = require('fs-extended');
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var dataBase = require('../db/dataBase.json');

var connection = mysql.createConnection({
    host: dataBase.dbHost,
    user: dataBase.dbUser,
    password: dataBase.dbPassword,
    database: dataBase.dbDatabase
});

var createUser = () => {

    var questions = [{
        type: 'input',
        name: 'login',
        message: 'Introduzca el nombre del usuario: '
    }, {
        type: 'input',
        name: 'name',
        message: 'Nombre: '
    }, {
        type: 'input',
        name: 'id',
        message: 'ID: '
    }, {
        type: 'password',
        name: 'password',
        message: 'Introduzca la constraseña del usuario: '
    }];

    inquirer.prompt(questions).then((answers) => {

        var hashing = new Promise((resolve, reject) => {
            bcrypt.genSalt(8, (err, salt) => {
                bcrypt.hash(answers.password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        });
        hashing.then((hashpass) => {

            var post = {
                id: answers.id,
                login: answers.login,
                name: answers.name,
                password: hashpass
            };

            connection.query('INSERT INTO login SET ?', post, function(error) {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log('Usuario añadido con éxito');
                }
            });

        }, (err) => {
            console.log("Fallo");
        });
    });
}

module.exports.createUser = createUser;
