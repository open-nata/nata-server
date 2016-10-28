/**
 * Created by ghj on 16-10-27.
 */

'use strict'

const mongoose = require("mongoose");

//连接mongodb数据库
module.exports = () =>{
    const db = mongoose.connect('mongodb://localhost/nata-server',(err)=>{
        if(err){
            console.log('connection error',err);
        }else{
            console.log(`connection successful : mongodb://localhost/nata-server`);
        }
    })
    return db;
}