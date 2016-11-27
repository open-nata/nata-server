/**
 * Created by ghj on 16-10-27.
 */
const DeviceModel = require('../models/model-device');

const Device = require('nata-device');

/*用于minicap,跟踪手机的状态*/


/*创建一个device实例,由在线设备存到数据库中*/
module.exports.create = (req,res,next)=>{
    const device = new DeviceModel();

    const deviceId = req.params.id;
    console.log(`create device with id ${deviceId}`);

    new Device(deviceId).getDeviceInfo().then((info)=> {
        console.log('**********************');
        console.log(device.id = info.id);
        console.log(device.name = info.name);
        console.log(device.android_version = info.version);
        console.log(device.sdk_version = info.sdk);
        console.log(device.resolution = info.resolution);
        console.log(device.manufacturer = info.manufacturer);
        console.log(device.cpu_abi = info.cpu);
        console.log(device.tag);
        console.log(device.state);
        console.log(device.create_at)
        console.log('**********************');

        device.save((err, data) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json(data)
        })
        }).catch((err)=>{
            next(err);
        })
}

/*更新一个设备的信息*/
module.exports.update = (req,res,next)=>{
    const deviceId = req.params.id;

    const tag = req.body.tag;

    DeviceModel.findOne({id:deviceId}).exec((err,device)=>{
        device.tag = tag;

        device.save((error)=>{
            if(error) return next(error)
            return res.status(200).json(device);
        })
    })

}

/*删除device*/
module.exports.delete = (req, res, next) => {
    const deviceId = req.params.id
    DeviceModel.findOneAndRemove({
        id: deviceId,
    }, (err, record) => {
        if (err || !record) {
            next(err)
        }
        return res.status(200).json(record)
    })
}

/*查看在线设备列表*/
module.exports.online = (req,res,next) =>{
    Device.getOnlineDevices().then((devices)=>{
        res.status(200).json(devices);
    }).catch((err)=>{
        next(err)
    })
}
