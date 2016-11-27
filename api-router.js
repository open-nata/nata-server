/**
 * Created by ghj on 16-10-27.
 */
'use strict'

const express = require('express');

const router = express.Router();

const deviceApi = require('./api/api-devices');
const projectApi = require('./api/api-project');
const testplanApi = require('./api/api-testplan');
const testsampleApi = require('./api/api-testsample');
const testrunnerApi = require('./api/api-testrunner');

//Api for project
/*创建一个项目*/
router.post('/project',projectApi.create);
/*删除一个项目*/
router.delete('/project/:name',projectApi.delete);
/*更新一个项目*/
router.put('/project/:name',projectApi.update);
/*获取一个项目详细信息*/
router.get('/project/:name',projectApi.getDetail);


//Api for device
/*获取在线设备列表*/
router.get('/devices',deviceApi.online);
/*创建一个device实例,参数deviceId由路由传递*/
router.post('/devices/:id',deviceApi.create);
/*更新一个device实例,参数由deviceId由路由传递*/
router.put('/devices/:id',deviceApi.update);
/*删除一个device实例*/
router.delete('/devices/:id',deviceApi.delete);


//Api for testplan and testsample
/*创建一个测试计划*/
router.post('/testplan',testplanApi.create);

/*创建一个测试用例*/
router.post('/testsample',testsampleApi.create);
router.put('/testsample',testsampleApi.update);

/*运行列表以及运行查看*/
router.post('/testrunner',testrunnerApi.create);

router.delete('/testrunner/:id',testrunnerApi.delete);
router.post('/testrunner/:id/save',testrunnerApi.save);

router.get('/testrunner/:id',testrunnerApi.getData);
router.get('/testrunners/:id',testrunnerApi.goDetail);
router.post('/testrunners',testrunnerApi.showTestsample);


module.exports = router;
