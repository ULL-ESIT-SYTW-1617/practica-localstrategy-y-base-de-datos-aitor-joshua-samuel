var json = require('json-update');
var bcrypt = require('bcrypt');
var fs = require('fs-extended');
var readjson = require('readjson');
var Dropbox = require('dropbox');
var Fs = require('fs');
var path = require('path');
var Sequelize=require('sequelize')

var sequelize = new Sequelize('SYTW', 'root', 'aitorjoshuasamuel', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

var login = sequelize.define('user', {
  
  id: {
    type: Sequelize.NUMBER,
    field: 'id'
  },
  login: {
    type: Sequelize.STRING,
    field: 'login'
  },

  name: {
    type: Sequelize.STRING,
    field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
  }

}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    name: 'admin',
    id: 1
  });
});

