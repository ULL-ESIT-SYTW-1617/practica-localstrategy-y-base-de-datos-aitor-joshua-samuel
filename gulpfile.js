var gulp = require('gulp');
var addUser = require('./models');


gulp.task('new-user', function(cb) {
  return addUser.createUser();
});
