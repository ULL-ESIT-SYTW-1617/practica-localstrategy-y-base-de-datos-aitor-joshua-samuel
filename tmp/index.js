var inquirer = require('inquirer');
var fs = require('fs-extended');
var readjson = require('readjson');
var bcrypt = require('bcrypt');

//login, name, password (encrypted)}

var questions = [{
    type: 'input',
    name: 'login',
    message: 'Introduzca el nombre del usuario: '
}, {
    type: 'input',
    name: 'name',
    message: 'Nombre: '
}, {
    type: 'password',
    name: 'password',
    message: 'Introduzca la constraseña del usuario: '
}];

inquirer.prompt(questions).then(function(answers) {


    var promise = new Promise(function(resolve, reject) {
        readjson('./users.json', function(error, json) {
            if (error) {
                console.error(error.message);
                reject("Error");
            } else {
                resolve(json);
            }
        });
    });
    promise.then(function(file) {

        var passwd;
        var id_ = file.users.length + 1;
        var config = JSON.stringify(file);
        console.log(config);
        var data = JSON.parse(config);
        console.log(data);
        var hashing = new Promise(function(resolve, reject) {
            bcrypt.genSalt(8, function(err, salt) {
                bcrypt.hash(answers.password, salt, function(err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        });
        hashing.then(function(hashpass) {

            data.users.push({
                id: id_,
                login: answers.login,
                name: answers.name,
                password: hashpass
            });
            fs.writeJSON('./users.json', data, function(err) {
                if (err) {
                    console.log(err);
                }
            });

        }, function(err) {
            console.log("Fallo");
        });

    }, function(err) {
        console.log("Fallo");
    });

});
