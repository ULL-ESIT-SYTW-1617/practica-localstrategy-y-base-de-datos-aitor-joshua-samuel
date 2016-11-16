var inquirer = require('inquirer');
var fs = require('fs-extended');
var readjson = require('readjson');
var bcrypt = require('bcrypt');

//login, name, password (encrypted)}
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
        type: 'password',
        name: 'password',
        message: 'Introduzca la constraseña del usuario: '
    }];

    inquirer.prompt(questions).then((answers) => {


        var promise = new Promise((resolve, reject) => {
            readjson('./db/users.json', (error, json) => {
                if (error) {
                    console.error(error.message);
                    reject("Error");
                } else {
                    resolve(json);
                }
            });
        });
        promise.then((file) => {

            var passwd;
            var id_ = file.users.length + 1;
            var config = JSON.stringify(file);
            console.log(config);
            var data = JSON.parse(config);
            console.log(data);
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

                data.users.push({
                    id: id_,
                    login: answers.login,
                    name: answers.name,
                    password: hashpass
                });
                fs.writeJSON('./db/users.json', data, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

            }, (err) => {
                console.log("Fallo");
            });

        }, (err) => {
            console.log("Fallo");
        });

    });

}

module.exports.createUser = createUser;
