/**
 * Created by ghj on 16-10-27.
 */
'use strict'

const express = require('express');

const router = express.Router();

const deviceApi = require('./api/api-devices');

//Api for device

router.post('/devices/:id',deviceApi.create);
router.get('/devices/online',deviceApi.online);
//router.delete('/devices/:id',deviceApi.delete);

module.exports = router;