//var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const createError =require('http-errors')

const auth = require('./middleware/auth')
const headers = require('./middleware/headers')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customersRouter = require('./routes/customers');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');


var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'exports')));

app.use(headers);
app.use('/', indexRouter);
app.use('/users',auth, usersRouter);
app.use('/customers', customersRouter);
app.use('/products',auth, productsRouter);
app.use('/orders', ordersRouter);

app.use(function(req,res,next){
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);// set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
 res.status(err.status || 500);
//   res.render('error');
});

module.exports = app;
