var express = require('express'),
    steam   = require('./index');

var app = express();

app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
	realm: 'http://localhost:5000/',
	verify: 'http://localhost:5000/verify',
	apiKey: "9EB17BB39112DD9EAE9668F928E9EB56"}
));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	console.log(req.user)
	res.send(req.user == null ? 'not logged in' : 'hello ' + req.user.username).end();
});

app.get('/authenticate', steam.authenticate(), function(req, res) {
	res.redirect('/');
});

app.get('/verify', steam.verify(), function(req, res) {
	res.send(req.user).end();
});

app.get('/logout', steam.enforceLogin('/'), function(req, res) {
	req.logout();
	res.redirect('/');
});

app.listen(5000);
console.log('listening');
