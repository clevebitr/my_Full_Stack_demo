
const Sequelize = require('sequelize');

//创建新的sequelize实例
const DB = new Sequelize("onlinedb","root","123456",{
    host:"localhost",//主机地址
    port:3306,//数据库端口号
    dialect:"mysql",//数据库类型
    pool:{
        max:5,//最大链接数量
        min:0,//最小连接数量
        idle:10000,//10秒内没有调用，释放该链接
    },define:{
        timestamps:false
    },loggong:console.log//控制台输出日志
});


//测试链接
DB.authenticate()
    .then(()=>{
        console.log("数据库链接成功");
    })
    .catch((err)=>{
        console.log("数据库链接失败：",err);
    });

module.exports = DB