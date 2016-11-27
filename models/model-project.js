'use strict'

const mongoose = require('mongoose');

//Project Schema
const ProjectSchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true, //自动查重
        trim:true
    },
    describe:String,
    manager:String,
    imageUrl:String,
    create_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Project',ProjectSchema)

