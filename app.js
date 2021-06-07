var createError = require('http-errors');
var express = require('express');

/** load env */
var dotenv = require('dotenv')
dotenv.config();


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var cors = require('cors')

/** Local Import and Initializations */
var usersRouter = require('./application/routes/user.routes');
var authRouter = require('./application/routes/auth.routes');
var connectDB = require('./application/core/db')


var app = express();

app.use(logger('dev'));
app.use(cors())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectDB()


/** Router Settings ***/
var api_router = express.Router()
api_router.use('/users', usersRouter);
api_router.use('/auth', authRouter);
app.use('/api', api_router)
app.get('/', function( req, res) {
  res.json({message: 'Welcome to API'})
});



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
  res.json(err)
});

module.exports = app;
