/**
 * Created by ghj on 16-10-27.
 */
const DeviceModel = require('../models/model-device');

const Device = require('nata-device');

//创建一个device实例
module.exports.create = (req,res,next)=>{
    const device = new DeviceModel();

    const deviceId = req.params.id;
    console.log(`create device with id ${deviceId}`);

    new Device(deviceId).getDeviceInfo().then((info)=>{
        console.log('**********************');
        console.log(device.id = info.id);
        console.log(device.name = info.name);
        console.log(device.android_version = info.version);
        console.log(device.sdk_version = info.sdk);
        console.log(device.resolution = info.resolution);
        console.log(device.manufacturer = info.manufacturer);
        console.log('**********************');
    })
    // device.save((err,data) =>{
    //     if(err){
    //         return next(err);
    //     }
    //     return res.status(200).json(data)
    // }).catch((err)=>{
    //     next(err);
    // })
}


//查看在线设备列表
module.exports.online = (req,res,next) =>{
    Device.getOnlineDevices().then((devices)=>{
        res.status(200).json(devices);
    }).catch((err)=>{
        next(err)
    })
}
