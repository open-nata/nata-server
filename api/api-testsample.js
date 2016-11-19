/**
 * Created by ghj on 16-11-18.
 */
'use strict'

const TestsampleModel = require('../models/model-testsample');

/*创建一个测试用例*/
module.exports.create = (req,res,next)=>{
    const testsample = new TestsampleModel();

    testsample.project = req.body.project;
    testsample.version = req.body.version;
    testsample.testplan = req.body.testplan;
    testsample.name = req.body.name;
    testsample.manager = req.body.manager;
    testsample.describe = req.body.describe;
    testsample.tag = req.body.tag;

    testsample.config = req.body.config;
    testsample.script = req.body.script;

    testsample.save((err,data)=>{
        if(err) return next(err);
        return res.status(200).json(data);
    })
}

/*更新一个测试用例：添加了config或者script的信息,具体的设备的信息关联的testcast*/
module.exports.update = (req,res,next)=>{
    console.log('更新测试用例')
    console.log(req.body)

    const project = req.body.project;
    const version = req.body.version;
    const name = req.body.name;

    TestsampleModel.findOne({project:project,version:version,name:name}).exec((err,testsample)=> {
        testsample.config = req.body.config;
        testsample.script = req.body.script;

        testsample.save((error)=> {
            if (error) return next(err);
            return res.status(200).json(testsample);
        })
    })
}