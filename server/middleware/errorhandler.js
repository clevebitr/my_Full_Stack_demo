// 定义错误中间件
// middleware/errorhandler.js

function errorHandler(err, req, res, next) {
    console.log(err, err.name);
    let code = 500;
    let message = 'Internal Server Error';
    // token解析的错误
    if (err.name === 'UnauthorizedError' && err.message ==="No authorization token was found") {
      code = 401
      message = '请登录'
    }else if (err.name === 'UnauthorizedError' && err.message === "jwt expired") {
      code = 401
      message = 'Token过期,请重新登录'     
    }
    res.statusCode = code;
    //允许127.0.0.1：5500跨域访问
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    res.header('Access-Control-Allow-Credentials',true)
    //返回数据
    res.json({
      status: code,
      msg:message,
    })
}

  module.exports = errorHandler