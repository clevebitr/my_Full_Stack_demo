var express = require('express');
const router = express.Router();
const ueModel = require('../models/ueModel');
const { token } = require('morgan');
const jwt = require('jsonwebtoken');//导入token包
const SECRET_KEY = 'guoyunyu01'//token密钥

//登录
router.post('/login',async(req,res,next)=>{
  try{
    const{upwd,email} = req.body;
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj)
    const user = await ueModel.findOne({where:{email}});
    if(!user){
      console.log(user)
        return res.json({
          code:1002,
          msg:"登录失败,检查账号或密码",
          login_state:false
        });
    }
    if (user.dataValues.upwd==upwd){
      const token = jwt.sign(
        { user: { name:user.dataValues.uname, password:user.dataValues.upwd } },
        SECRET_KEY,
        { expiresIn: '3h' }
      )
      console.log('🚀 → token:', token)
      return res.json({
        code:1001,
        msg:"登录成功",
        token,
        login_state:true
      });
    }else{
      return res.json({
        code:1002,
        msg:"登录失败,检查账号或密码",
        login_state:true
      });
    }
  }catch(err){
    next(err);
  }
});

//查询 http://localhost:3000/student/search
router.get('/search',async(req,res,next)=>{
  try{
    const result = await ueModel.findAll({raw:true});
    res.json({
      code:1001,
      msg:result,
    });
  }catch(err){
    next(err);
  }
})

//添加 http://localhost:3000/student/add
router.post('/add',async(req,res,next)=>{
  try{
    const{id,uname,upwd,email,admin} = req.body;
    const user = await ueModel.findOne({where:{email}});
    if (user) {
      return res.json({
        code:1002,
        msg:'该用户已存在',
      });
    }
    await ueModel.create({id,uname,upwd,email,admin});
    res.json({
      code:1001,
      msg:'注册成功',
    });
  }catch(err){
    next(err);
  }
});

//删除 http://localhost:3000/student/delete
router.post('/delete',async(req,res,next)=>{
  try{
    const{id} = req.body;
    await ueModel.destroy({where:{id}});
    res.json({
      code:1001,
      msg:'删除成功',
    });
  }catch(err){
    next(err);
  }
});

//更新 http://localhost:3000/student/update
router.put('/update',async(req,res,next)=>{
  try{
    const{id,uname,upwd,email,admin} = req.body;
    const user = await ueModel.findOne({where:{email}});
    if(!user){
        return res.json({
          code:1002,
          msg:"查询失败",
        });
    }
    await user.update({uname,upwd,email,admin});
    res.json({
      code:1001,
      msg:"更新成功",
    });
  }catch(err){
    next(err);
  }
});

//错误处理
router.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).json({
    code:1002,
    msg:"服务器发生错误"
  });
});

module.exports = router;
