/**
 * Created by ghj on 16-11-1.
 */
'use strict'

const ProjectModel = require('../models/model-project');

/*创建一个Project*/

module.exports.create = (req,res,next)=>{

    const project = new ProjectModel();

    project.name = req.body.name;
    project.describe = req.body.describe;
    project.manager = req.body.manager;
    project.filePath = req.body.filePath;

    project.save((err,data)=>{
        if(err) return next(err);
        return res.status(200).json(data);
    })
}

/*更新一个Ｐroject*/

module.exports.update = (req,res,next)=>{

    const apkId = req.params.id;

    ProjectModel.findOne({_id:apkId}).exec((err,apk)=>{

    })

}