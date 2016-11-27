/**
 * Created by ghj on 16-10-27.
 */
'use strict'

const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    id:{
        type:String,
        unique:true,
        trim:true,
    },
    name:String,
    android_version:String,
    sdk_version:Number,
    resolution:String,
    cpu_abi:String,
    manufacturer:String,
    tag:{type:String,default:"default"},  //用以标记device的封面
    state:{type:String,default:"free"},
    create_at:{type:Date,default:Date.now}
},{id:false});

//id:false 禁止自动生成id

module.exports = mongoose.model('Device',DeviceSchema);
