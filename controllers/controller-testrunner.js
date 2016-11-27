/**
 * Created by ghj on 16-11-23.
 */

'use strict'

const TestrunnerModel = require('../models/model-testrunner')

/*获取数据所有运行列表*/
module.exports.show = (req,res,next) =>{
    TestrunnerModel.find({},(err,tests)=>{
        if(err) return next(err)
        return res.json(tests)

    })
}

/*删除数据库所有的运行列表*/
module.exports.removeAll = (req,res,next)=>{
    TestrunnerModel.remove({},(err)=>{
        if(err) return next(err)
        else return res.status(200).send('Remove all testcases successfully')
    })
}