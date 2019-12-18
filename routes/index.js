var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shinaDatabase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
/*GET login page. */ 
router.get('/login',function(req,res,next){
  res.render('login');
})
/*GET register page. */ 
router.get('/register',function(req,res,next){
  res.render('register');
})
/*GET checkPage page */
router.get('/checkPage',function(req,res,next){
  res.render('checkPage');
})
/* GET sharePage page*/
router.get('/sharepage',function(req,res,next){
  res.render('sharepage');
});

/* GET personinfo page*/
router.get('/personinfo',function(req,res,next){
  res.render('personinfo');
});
/* GET travelList page*/
router.get('/travelList',function(req,res,next){
  res.render('travelList');
});
/* GET shimakazecircle page*/
router.get('/shimakazecircle',function(req,res,next){
  res.render('shimakazecircle');
});
/* GET kazecircle page*/
router.get('/kazecircle',function(req,res,next){
  res.render('kazecircle');
});
module.exports = router;
