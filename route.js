/**
 * Created by ghj on 16-10-27.
 */

'use strict'

var express = require('express');

const router = express.Router();

const DeviceController = require('./controllers/controller-device');

/*Ｈome Page*/
router.get('/',(req,res)=>{
    res.send('Hello');
});


router.get('/book',(req,res)=>{
    res.send('Hello Book');
});

router.get('/devices',DeviceController.show);

module.exports = router;