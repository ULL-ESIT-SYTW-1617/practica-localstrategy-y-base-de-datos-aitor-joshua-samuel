var records = require('./users.json').users;
var json = require('json-update');

var bcrypt = require('bcrypt');
var fs = require('fs-extended');
var readjson = require('readjson');



exports.findById = (id, cb) => {
    process.nextTick(() => {
        var idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    });
}

exports.findByUsername = (username, cb) => {
    process.nextTick(() => {
        for (var i = 0, len = records.length; i < len; i++) {
            var record = records[i];
            if (record.login === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    });
}

exports.changePassword = (username, password) => {
    bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < records.length; i++) {
                    if (records[i].login == username) {
                        records[i] = {
                            id: records[i].id,
                            login: records[i].login,
                            name: records[i].name,
                            password: hash
                        }
                    }
                }
            }
        });
    });

}
