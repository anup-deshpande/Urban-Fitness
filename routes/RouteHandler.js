var express=require('express');
var router=express.Router();

router.get('/',function(req,res) {
  res.render('index');
});

router.get('/home',function(req,res) {
  res.render('index');
});

router.get('/categories',function(req,res) {
  res.render('categories');
});

router.get('/item',function(req,res) {
  res.render('item');
});

router.get('/myitems',function(req,res) {
  res.render('myitems');
});

module.exports=router;
