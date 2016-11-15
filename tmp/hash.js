var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'hola';
const someOtherPlaintextPassword = 'not_bacon';

var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);


var a = bcrypt.compareSync('hola', hash); // true 

console.log(salt);
console.log(a);
