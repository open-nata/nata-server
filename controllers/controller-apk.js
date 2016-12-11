/**
 * Created by ghj on 16-12-11.
 */

const ApkModel = require('../models/model-apk');

/*获取所有的Apk列表,并返回*/
module.exports.show = (req,res,next)=>{
    ApkModel.find({},(err,apks)=>{
        if(err) return next(err)
        return res,send(apks)
    })
}

/*删除所有的apk*/
module.exports.removeAll = (req,res,next)=>{
    ApkModel.remove({},(err)=>{
        if(err) return next(err)
        return res.status(200).send('removeAll success');
    })
}
