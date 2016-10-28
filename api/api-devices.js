/**
 * Created by ghj on 16-10-27.
 */
const DeviceModel = require('../models/model-device');

//创建一个device实例
module.exports.create = (req,res,next)=>{
    const device = new DeviceModel();

    device.id = '12345678';
    device.name = '华为';
    device.android_version = '4.5';
    device.sdk_version = '4.5';
    device.cpu_abi = '4.5';
    device.manufacturer = '4.7';

    device.save((err,data) =>{
        if(err){
            return next(err);
        }
        return res.status(200).json(data)
    }).catch((err)=>{
        next(err);
    })
}

module.exports.show = (req,res) =>{
    res.send('Hello')
}