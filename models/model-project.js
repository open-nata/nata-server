'use strict'

const mongoose = require('mongoose');

//Project Schema
const ProjectSchema = new mongoose.Schema({
    name:String,
    describe:String,
    manager:String,
    filePath:String,
    create_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Project',ProjectSchema)

