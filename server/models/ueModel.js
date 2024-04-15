const DB = require('../model/dbconfig');//导入配置文件
const Sequelize = require('sequelize');//导入模块

//映射
const ueModel = DB.define("users",{
    id:{
        primaryKey:true,//主键
        type:Sequelize.INTEGER,//数据类型INT
        field:"id",
        autoIncrement:true//自增
    },
    uname:{
        type:Sequelize.STRING(30),
        allowNull:false,
        defaultValue:'空',
        field:"uname"
    },
    upwd:{
        type:Sequelize.STRING(20),
        allowNull:false,
        defaultValue:'123456',
        field:"upwd"
    },
    email:{
        type:Sequelize.STRING(50),
        defaultValue:null,
        field:"email"
    },
    admin:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:'0',
        field:"admin"
    }
})

module.exports = ueModel;