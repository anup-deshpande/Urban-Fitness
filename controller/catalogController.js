var express=require('express');
var itemDb = require('../model/ItemDB');


var router=express.Router();

router.get('/',function(req,res) {
  res.render('home');
});

router.get('/home',function(req,res) {
  res.render('home');
});

router.get('/categories',function(req,res) {
  var categories=getCategories();
  var itemData= itemDb.getItems();
  var data= {
      categories: categories,
      items: itemData
  }

  res.render('categories',{data: data});
});

router.get('/item',function(req,res) {
  res.render('item');
});

router.get('/myitems',function(req,res) {
  res.render('myitems');
});


router.get('/feedback',function(req,res) {
  res.render('feedback');
});

var categories=[];

let getCategories=function(){
  var data = itemDb.getItems();
  data.forEach(function (item) {
      if(!categories.includes(item.muscleGroup)){
          categories.push(item.muscleGroup);
      }

  });
  return categories;
};

module.exports=router;
