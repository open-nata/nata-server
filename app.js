/**
 * Created by ghj on 16-10-27.
 */
var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');

/*中间件*/



/*中间件morgan：在控制台显示req请求信息*/
var logger = require('morgan');
app.use(logger('dev'));

/*中间件serve-favicon*/
var favicon = require('serve-favicon');
app.use(favicon('./favicon.ico'));

/*中间件bodyParser*/
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
// }));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

var cors = require('cors');
app.use(cors());

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        //cb(null, req.params.name+'.png');
        cb(null,file.originalname);
    }
})

var upload = multer({ storage: storage }).any();

app.post('/images', function (req, res) {
    //res.end(req.params.name);

    upload(req, res, function (err) {
        if (err) {
            console.log(err.toString())
            return res.end(err.toString());
        }
        res.end('File is uploaded');
    });
    //console.log(req);
    //console.log(req);
    // if(!req.file) {
    //     return res.status(404)
    // }
    // var filename = req.file.filename;
    // res.status(200).json({filename: filename})
});

/*路由*/
var route = require('./route');
var apiRoute = require('./api-router');
app.use('/api',apiRoute);
app.use('/',route);

/*静态资源*/
app.use(express.static('./public'));

/*错误处理*/

/*路由中间件：抓取错误*/

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    console.log('error handle1')
    err.status = 404;
    next(err);
});

/*错误处理中间件*/
app.use(function(err,req,res,next) {
    console.log('error handle2')
    console.log(err)
    res.status(500).send(err);
});

module.exports = app;