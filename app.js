const createError = require('http-errors');
const express = require('express');

/** load env */
const dotenv = require('dotenv')
dotenv.config();


const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const cors = require('cors')

/** Local Import and Initializations */
const usersRouter = require('./application/routes/user.routes');
const authRouter = require('./application/routes/auth.routes');
const connectDB = require('./application/core/db')
const handleErrors = require('./application/errors/handlers')


const app = express();

app.use(logger('dev'));
app.use(cors())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
connectDB()


/** Router Settings ***/
const api_router = express.Router()
api_router.use('/users', usersRouter);
api_router.use('/auth', authRouter);
app.use('/api', api_router)
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(handleErrors);

module.exports = app;
