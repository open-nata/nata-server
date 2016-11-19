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

//Api for project
/*创建一个项目*/
router.post('/project',projectApi.create);
/*删除一个项目*/
router.delete('/project/:id',projectApi.delete);
/*更新一个项目*/
router.put('/project/:id',projectApi.update);

//Api for device
/*获取在线设备列表*/
router.get('/devices',deviceApi.online);
/*创建一个device实例,参数deviceId由路由传递*/
router.post('/devices/:id',deviceApi.create);


//Api for testplan and testsample
/*创建一个测试计划*/
router.post('/testplan',testplanApi.create);

/*创建一个测试用例*/
router.post('/testsample',testsampleApi.create);
router.put('/testsample',testsampleApi.update);

module.exports = router;
