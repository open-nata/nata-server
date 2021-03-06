/**
 * Created by ghj on 16-11-1.
 */
'use strict'

/*创建project目录*/
var path = require('path');
var fs = require('fs');
const projectPath = path.join(__dirname,"../public/project");

const ProjectModel = require('../models/model-project');

/*创建一个Project*/
module.exports.create = (req,res,next)=>{

    const project = new ProjectModel();

    project.name = req.body.name;
    project.describe = req.body.describe;
    project.manager = req.body.manager;
    project.imageUrl = req.body.imageUrl;

    project.save((err,data)=>{
        if(err) return next(err);

        /*项目创建成功后，在public目录下新建一个project.name目录和子目录apks*/
        fs.stat(projectPath,(err,stats)=>{
            var pathTarget = path.join(projectPath,project.name);
            fs.mkdir(pathTarget,(err)=>{
                if(err) console.log(err);
            })
        })

        return res.status(200).json(data);
    })
}

/*更新一个Ｐroject*/
module.exports.update = (req,res,next)=>{

    const projectName = req.params.name;

    ProjectModel.findOne({name:projectName}).exec((err,project)=>{
        //project.name = req.body.name;
        project.describe = req.body.describe;
        project.manager = req.body.manager;
        //project.imageUrl = req.body.filePath;

        project.save((error)=>{
            if(error) return next(err);
            return res.status(200).json(project);
        })
    })
}

/*获取一个Ｐroject详细信息*/
module.exports.getDetail = (req,res,next)=>{

    const projectName = req.params.name;

    ProjectModel.findOne({name:projectName}).exec((err,project)=>{
        if(err) return next(err);
        return res.status(200).json(project);
    })
}

/*删除一个项目*/
module.exports.delete = (req,res,next)=>{
    const project = req.params.name;

    //删除一个project,调用mongoose的findOneAndRemove方法从数据库删除
    ProjectModel.findOneAndRemove({
        name:project
    },(err,record)=>{
        if(err) return next(err)
        return res.status(200).json(record)
    })
}