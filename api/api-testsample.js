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

/*更新*/