const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const cors = require('cors');
const steam = require('./controllers/steam_controller')
const mongoose = require('mongoose')
mongoose.connect('mongodb://todo-fancy-data:11o22o12@ds231740.mlab.com:31740/todo-fancy', (req, res) => {
  console.log('database connected!');
})

const app = express()
app.use(require('express-session')({ resave: false, saveUninitialized: false, secret: 'a secret' }));
app.use(steam.middleware({
	realm: 'http://localhost:5000/',
	verify: 'http://localhost:5000/verify',
	apiKey: "9EB17BB39112DD9EAE9668F928E9EB56"}
));
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.get('/verify', steam.verify(), function(req, res) {
  console.log('berhasilllll', req.user)
	// res.send(req.user).end();
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 5000)
  res.render('error')
})

module.exports = app
