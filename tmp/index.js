var inquirer = require('inquirer');
var fs = require('fs-extended');
var readjson = require('readjson');

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

        var id_ = file.users.length + 1;
        var config = JSON.stringify(file);
        console.log(config);
        var data = JSON.parse(config);
        console.log(data);
        data.users.push({
            id: id_,
            login: answers.login,
            name: answers.name,
            password: answers.password
        });
        console.log(data);

        fs.writeJSON('./users.json', data, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }, function(err) {
        console.log("Fallo");
    });



    //console.log(txt);
    //console.log(data);
    /*  data.employees.push({
          login: answers.login,
          name: answers.name,
          password: answers.password
      });
      txt = JSON.stringify(data);*/
});
