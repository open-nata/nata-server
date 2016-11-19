/**
 * Created by ghj on 16-10-27.
 */

'use strict'

var express = require('express');

const router = express.Router();

const DeviceController = require('./controllers/controller-device');
const ProjectController = require('./controllers/controller-project');
const TestplanController = require('./controllers/controller-testplan');
const TestsampleController = require('./controllers/controller-testsample');

/*Ｈome Page*/
router.get('/',(req,res)=>{
    res.send('Nata server for android!');
});

/*Devices：获取数据库设备列表*/
router.get('/devices',DeviceController.show);
router.delete('/devices',DeviceController.removeAll);

/*Projects:获取数据库项目列表*/
router.get('/projects',ProjectController.show);
router.delete('/projects',ProjectController.romoveAll);

/*Testplan 与　Ｔestsample 列表*/
router.get('/:project/:version/testplan',TestplanController.show);
router.delete('/testplan',TestplanController.removeAll);
router.get('/:project/:version/:testplan/testsample',TestsampleController.show);
router.delete('/testsample',TestsampleController.removeAll);

module.exports = router;