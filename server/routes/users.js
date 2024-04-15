var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin',(req,res)=>{
  // console.log(req.body)
  res.send({
    status:200,
    message:'success', 
    url:'http://localhost:3000/main' 
  })
  
  // res.render('users', {
  //   layout: false,
  //   title: "主页",
  //   mainInfo: 'main paper'
  // });
  // res.location('/main');
  // res.location('/main');
  // res.statusCode = 302;
  // res.end('ok')
  return;
})

module.exports = router;
