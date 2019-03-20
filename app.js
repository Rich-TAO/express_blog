let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let lessMiddleware = require('less-middleware');
let logger = require('morgan');
let nunjucks = require('nunjucks');
//路由
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/about');

let app = express();

// let mysql = require('mysql');
//
// let connect = mysql.createConnection({
//   host:'127.0.0.1',
//   user:'root',
//   password:'root',
//   database:'test'
// })
// connect.connect()
// connect.query('SELECT * FROM node', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// connect.end();
// view engine setup
nunjucks.configure( path.join(__dirname, 'views'), {
  autoescape: true,
  express: app
});
app.set('view engine', 'html');

//中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//使用路由
app.use('/', indexRouter);
app.use('/about', usersRouter);

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
