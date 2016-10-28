/**
 * Created by ghj on 16-10-27.
 */
var express = require('express');
var app = express();

/*中间件*/

/*中间件morgan：在控制台显示req请求信息*/
var logger = require('morgan');
app.use(logger('dev'));



/*路由*/
var route = require('./route');
var apiRoute = require('./api-router');
app.use('/',apiRoute);
app.use('/',route);


/*静态资源*/

/*错误处理*/

/*路由中间件：抓取错误*/

app.use(function(req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*错误处理中间件*/
app.use(function(err,req,res,next) {
    res.status(500).send('404 Not Found');
});

module.exports = app;