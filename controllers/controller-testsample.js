/**
 * Created by ghj on 16-11-18.
 */

const TestsampleModel = require('../models/model-testsample');

/*获取数据库测试计划列表*/
module.exports.show = (req,res,next) =>{

    const project = req.params.project;
    const version = req.params.version;
    const testplan = req.params.testplan;

    console.log(project+' '+version+' '+testplan);

    TestsampleModel.find({project:project,version:version,testplan:testplan}).exec((err,testsamples)=>{
        if(err) return next(err);
        return res.json(testsamples);
    })
}

/*删除数据库所有的测试用例*/
module.exports.removeAll = (req,res,next)=>{
    TestsampleModel.remove({},(err)=>{
        console.log("Remove all testsamples")
        if(err)
            return next(err)
        else
            return res.status(200).send('removeAll success');
    })
}