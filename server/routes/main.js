var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',(req,res)=>{
  // console.log(req.body)
  // res.send({
  //   status:200,
  //   message:'success',  
  // })
  
  res.render('users', {
    layout: false,
    title: "主页",
    mainInfo: 'main paper'
  });
  return;
})

module.exports = router;
