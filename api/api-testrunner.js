/**
 * Created by ghj on 16-11-23.
 */

const TestrunnerModel = require('../models/model-testrunner');

const Device = require('nata-device');
const MonkeyRunner = require('nata-monkey');
const _ = require('lodash');
const path = require('path');
const resultPath = path.join(__dirname,'../public/project');


/*For minicap: tracker devices*/
const childProcess = require('child_process');
const exec = childProcess.exec;
const minicap = path.join(__dirname,'../minicap');

function runMinicap(device) {
    exec(`adb -s ${device} forward tcp:1717 localabstract:minicap`,(error)=>{
        if(error) console.log(error)
        console.log('execute minicap for device ${device}')
    })
}

/*跟踪设备*/
Device.getTracker().then((tracker) => {

    tracker.on('add', (device) => {
        console.log(`Device ${device.id} was plugged in`)
        exec(`./run.sh ${device.id} &`, { cwd: minicap }, (err) => {
            if (err) console.log(err)
            console.log('execute run.sh')
        })
    })

    tracker.on('remove', (device) => {
        console.log(`Device ${device.id} was unplugged`)
    })

    tracker.on('end', () => {
        console.log('Tracking stopped')
    })
}).
catch((err) => {
    console.log(err)
})

/*Monkey运行实例*/
function startMonkey(command,device,testid){
    const deviceId = device;
    const cmd = command;
    const path = `${resultPath}/monkey`;
    const monkey = new MonkeyRunner(deviceId,cmd,path);

    monkey.monkey();

    const runner = monkey.getRunner();
    const stdout = monkey.getStdout();
    const stderr = monkey.getStderr();

    if(stderr){
        stderr.on('data',(data)=>{
            console.log(data)
        })
    }

    if(stdout){
        stdout.on('data',(data)=>{

            TestrunnerModel.findOne({_id:testid}).exec((err,test)=>{

                test.resultMonkey.push(data)

                test.save((error)=>{
                    console.log(error)
                    console.log("更新数据")
                })

            })

            console.log(data)
        })
    }

    if(runner){
        runner.on('close',(code)=>{
            console.log('closing code'+code)


        })
    }
}

/*创建一次运行*/
module.exports.create = (req,res,next)=>{

    /*验证设备id:两方面的验证，一方面是设备状态的验证，
    另一方面是设备是否正在使用的验证；将设备的状态设置为busy*/

    const testrunner = new TestrunnerModel();

    testrunner.project = req.body.project;
    testrunner.version= req.body.version;
    testrunner.testplan = req.body.testplan;
    testrunner.testsample = req.body.testsample;
    testrunner.tag = req.body.tag;
    testrunner.deviceId = req.body.deviceId;
    testrunner.state = req.body.state; //初始状态
    testrunner.config = req.body.config;
    testrunner.script = req.body.script;
    testrunner.resultMonkey = req.body.resultMonkey;

    testrunner.save((err,data)=>{
        if(err) return next(err);

        /*判断算法如果是monkey算法，则开始运行monkey*/
        startMonkey(testrunner.config,testrunner.deviceId,testrunner._id);

        return res.status(200).json(data)
    })

}



/*获取运行过程中的数据*/
module.exports.getData = (req,res,next)=>{

    const id = req.params.id;

    TestrunnerModel.findOne({
        _id:id
    },(err,record)=>{
        if(err|| !record){
            next(err)
        }
        return res.status(200).json(record)
    })
}

/*删除一次运行在数据库的数据：结果和配置文件依旧保留在github仓库*/
module.exports.delete = (req,res,next) =>{

    const id = req.params.id;

    /*验证条件*/

    TestrunnerModel.findOneAndRemove({
        _id:id
    },(err,record)=>{
        if(err|| !record){
            next(err)
        }
        return res.status(200).json(record)
    })

}

/*当完成之后，将一次运行的结果保存到github仓库*/
module.exports.save = (req,res,next)=>{

    return res.status(200);
}

/*获取关联于一个测试用例的所有运行*/
module.exports.showTestsample = (req,res,next)=>{

    /*搜索条件*/
    const project = req.body.project;
    const version = req.body.version;
    const testplan = req.body.testplan;
    const testsample = req.body.testsample;

    TestrunnerModel.find({project:project,version:version,testplan:testplan,testsample:testsample},(err,data)=>{
        if(err) return next(err)
        else return res.status(200).json(data)
    })

}

/*获取一次运行的详细信息*/
module.exports.goDetail = (req,res,next)=>{

    const id = req.params.id;

    console.log(id)
    TestrunnerModel.findOne({
        _id:id
    },(err,record)=>{
        if(err|| !record){
            next(err)
        }

        const deviceId = record.deviceId;
        /*配置minicap的信息*/
        runMinicap(deviceId);
        console.log(record)
        return res.status(200).json(record)
    })
}