'use strict'

const ProjectModel = require('../models/model-project');

/*
获取所有项目列表,并返回
*/
module.exports.show = (req,res,next)=>{
    ProjectModel.find({},(err,projects)=>{
        if(err) return next(err);
        console.log(projects);
        return res.send(projects);
    })
}