/**
 * Created by ghj on 16-11-18.
 */

'use strict'

const TestplanModel = require('../models/model-testplan');

/*创建一个测试计划*/
module.exports.create = (req,res,next)=>{

    const testplan = new TestplanModel();

    testplan.project = req.body.project;
    testplan.version = req.body.version;
    testplan.name = req.body.name;
    testplan.manager = req.body.manager;
    testplan.describe = req.body.describe;
    testplan.tag = req.body.tag;

    /*查重：｛project,version,name｝*/
    TestplanModel.findOne({project:testplan.project,version:testplan.version,name:testplan.name})
        .exec((err,record)=>{
        if(record) {
            console.log("查重")
            return res.status(500).send("Error")
        }
        else{
            testplan.save((err,data)=>{
                if(err) return next(err);
                return res.status(200).json(data);
            })
        }
    })
}