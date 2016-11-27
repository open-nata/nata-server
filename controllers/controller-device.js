/**
 * Created by ghj on 16-10-27.
 */
'use strict'

const DeviceModel = require('../models/model-device');

/*获取数据库设备列表*/
module.exports.show = (req,res,next) =>{
    DeviceModel.find({},(err,devices)=>{
        if(err) return next(err);
        return res.json(devices);
    })
}

/*删除数据库所有的设备*/
module.exports.removeAll = (req,res,next)=>{
    DeviceModel.remove({},(err)=>{
        console.log("Remove all projects")
        if(err) return next(err)
        return res.status(200).send('removeAll success');
    })
}