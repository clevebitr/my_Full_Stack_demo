var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//跨域
const cors = require('cors');
//错误token处理
const errorhandler = require('./middleware/errorhandler')
//token key
var { expressjwt:jwt } = require("express-jwt")
const SECRET_KEY = 'guoyunyu01';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mianRouter = require('./routes/main')
var app = express();

//免token验证的接口地址
app.use(jwt({ 
  secret:SECRET_KEY, algorithms: ['HS256'] 
}).unless({ path:['/user/login','/user/add','/user/update'] }))

//路由加载前使用中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//跨域中间件
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/main',mianRouter);
app.use('/user', indexRouter);
app.use('/', usersRouter);
app.use('/public', express.static('public'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误中间件写在最后
app.use(errorhandler)

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
