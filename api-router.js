/**
 * Created by ghj on 16-10-27.
 */
'use strict'

const express = require('express');

const router = express.Router();

const deviceApi = require('./api/api-devices');

//Api for device

router.post('/devices',deviceApi.create);

module.exports = router;