/**
 * Created by ghj on 16-11-18.
 */

const TestplanModel = require('../models/model-testplan');

/*获取数据库测试计划列表:｛项目，版本｝*/
module.exports.show = (req,res,next) =>{

    const project = req.params.project;
    const version = req.params.version;

    console.log(project+' '+version);

    TestplanModel.find({project:project,version:version}).exec((err,testplans)=>{
        if(err) return next(err);
        return res.json(testplans);
    })
}

/*删除数据库所有的测试计划*/
module.exports.removeAll = (req,res,next)=>{
    TestplanModel.remove({},(err)=>{
        console.log("Remove all testplans")
        if(err) return next(err)
        return res.status(200).send('removeAll success');
    })
}