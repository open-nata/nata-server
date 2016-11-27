'use strict'

const ProjectModel = require('../models/model-project');

/*获取所有项目列表,并返回*/
module.exports.show = (req,res,next)=>{
    ProjectModel.find({},(err,projects)=>{
        if(err) return next(err);
        return res.send(projects);
    })
}

/*删除所有项目*/
module.exports.romoveAll = (req,res,next)=>{
    ProjectModel.remove({},(err)=>{
        if(err) return next(err)

        return res.status(200).send('removeAll success');
    })
}