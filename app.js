let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let lessMiddleware = require('less-middleware');
let logger = require('morgan');
let nunjucks = require('nunjucks');
//路由
let indexRouter = require('./routes/index');
let aboutRouter = require('./routes/about');
let albumRouter = require('./routes/album');
let detailsRouter = require('./routes/details');
let leacotsRouter = require('./routes/leacots');
let whisperRouter = require('./routes/whisper');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');
let writeRouter = require('./routes/write');

let app = express();




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
app.use('/about', aboutRouter);
app.use('/album', albumRouter);
app.use('/details', detailsRouter);
app.use('/leacots', leacotsRouter);
app.use('/whisper', whisperRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/write', writeRouter);

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
