/*Test-runner表示一个测试用例的一次具体运行：相对于原来nata里面的record的概念*/

const mongoose = require('mongoose');

const TestrunnerSchema = new mongoose.Schema({
    project:String,
    version:String,
    testplan:String,
    testsample:String,
    tag:String,  //算法标签
    deviceId:String, //设备id
    state:String, //此次运行的状态值：running,stop
    config:String,　　//配置：monkey，dfs等算法只需要一个配置命令即可
    script:String,　　//脚本:对于脚本的运行，表示脚本的具体内容
    resultMonkey:[String], //暂时用于monkey的运行结果
    create_at:{type:Date,default:Date.now}
})

module.exports = mongoose.model('Testrunner',TestrunnerSchema);