/**
 * Created by ghj on 16-11-18.
 */

const mongoose = require('mongoose');

const TestplanSchema = new mongoose.Schema({
    project:String,
    version:String,
    name:String,
    describe:String,
    manager:String,
    tag:String,
    create_at:{type:Date,default:Date.now}
});

module.exports = mongoose.model('Testplan',TestplanSchema);