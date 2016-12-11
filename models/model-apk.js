'use strict'

const mongoose = require('mongoose')

/*Activity的路径记录：actions*/
const ActPathSchema = new mongoose.Schema({
    activity:{
        type:String,
        unique:true,
        trim:true
    },
    actions:[String]
},{id:false});

const ApkSchema = new mongoose.Schema({
    name:String,
    version:String,
    package_name:{　　//包名
        type:String,
        unique:true,
        trim:true
    },
    activePaths:[ActPathSchema],
    activity_name:String,
    blackList:[String],
    create_at:{type:Date,default:Date.now}
})
