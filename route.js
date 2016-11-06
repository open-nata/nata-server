/**
 * Created by ghj on 16-10-27.
 */

'use strict'

var express = require('express');

const router = express.Router();

const DeviceController = require('./controllers/controller-device');
const ProjectController = require('./controllers/controller-project');

/*Ｈome Page*/
router.get('/',(req,res)=>{
    res.send('Hello HomePage');
});


router.get('/book',(req,res)=>{
    res.send('Hello Book');
});


/*Devices：获取数据库设备列表*/
router.get('/devices',DeviceController.show);

//Projects

module.exports = router;