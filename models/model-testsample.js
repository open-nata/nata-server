/**
 * Created by ghj on 16-11-18.
 */

const mongoose = require('mongoose');

const TestsampleSchema = new mongoose.Schema({
    project:String,
    version:String,
    testplan:String,
    name:String,
    describe:String,
    manager:String,
    tag:String,
    config:String,
    script:String,
    create_at:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Testsample',TestsampleSchema);