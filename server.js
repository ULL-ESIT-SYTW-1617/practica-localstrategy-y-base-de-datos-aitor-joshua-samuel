var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var db = require('./db');

passport.use(new Strategy(
    (username, password, cb) => {

        db.users.findByUsername(username, (err, user) => {
            if (!user) {
                return cb(null, false);
            }
            if (err) {
                return cb(err);
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if (err) {
                    console.log(err);
                }
                if (res == false) {
                    return cb(null, false);
                } else {
                    return cb(null, user);
                }
            });
        });
    }));

passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
    db.users.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/gh-pages'));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({
    extended: true
}));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.get('/libro', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    res.sendFile(__dirname + '/gh-pages/readme.html');
});

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
        failureRedirect: '/'
    }),
    (req, res) => {
        res.redirect('/');
    });

app.get('/password', require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
        res.render('passwd');
    });

app.post('/newpw', (req, res) => {

    if (req.body.pass.new == req.body.pass.old) {
        db.changePassword(req.user,req.body.pass.new)
        res.redirect('/profile');
    } else {
        res.redirect('/password');
    }

});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
    (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });


function random() {
    return Math.floor(Math.random() * (4000 - 3000)) + 3000;
}
var a = random();
console.log("Server running on localhost");
console.log(a);
app.listen(a);
