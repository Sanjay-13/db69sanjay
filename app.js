var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
  return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
  return done(null, false, { message: 'Incorrect password.' });
  }
  return done(null, user);
  });
  }))
const connectionString =process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});
var University = require('./models/university');
// We can seed the collection if needed on server start
async function recreateDB(){
  // Delete everything
  await University.deleteMany();
  let instance1 = new University({name:"Northwest Missouri", location:'Missouri', ranking:150});
  let instance2 = new University({name:"Texas Tech", location:'Texas', ranking:100});
  let instance3 = new University({name:"Suny Buffalo", location:'Newyork', ranking:50});
  instance1.save( function(err,doc) {
  if(err) return console.error(err);
  console.log("First object saved")
  });
  instance2.save( function(err,doc) {
    if(err) return console.error(err);
    console.log("Second object saved")
    });
    instance3.save( function(err,doc) {
      if(err) return console.error(err);
      console.log("Third object saved")
      });
  }
  let reseed = true;
  if (reseed) { recreateDB();}
var indexRouter = require('./routes/index');
var universityRouter = require('./routes/university');
var usersRouter = require('./routes/users');
var starsRouter = require('./routes/stars');
var slotRouter = require('./routes/slot');
var resourceRouter = require('./routes/resource');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/university', universityRouter);
app.use('/users', usersRouter);
app.use('/stars', starsRouter);
app.use('/slot', slotRouter);
app.use('/resource', resourceRouter);
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());
 // passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
