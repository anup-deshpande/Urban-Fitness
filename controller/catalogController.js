var express=require('express');
var itemDb = require('../utility/ItemDB');
var item=require('../model/item');
var useritem=require('../model/useritem');
var bodyParser=require('body-parser');
var session=require('express-session');

var router=express.Router();
var urlencodedParser=bodyParser.urlencoded({extended:false});

router.use(session({secret:'abcd'}));

router.get('/',function(req,res) {
  res.render('home');
});

router.get('/home',function(req,res) {
  res.render('home');
});

router.get('/home*',function(req,res){
  res.redirect('home');
});


router.get('/categories',function(req,res) {
  var categories=getCategories();
  var itemData= itemDb.getItems();

  var data= {
      categories: categories,
      items: itemData
  };

  res.render('categories',{data: data});
});

router.get('/categories/item',function(req,res) {
  var itemCode=req.query.itemCode;
  var item= itemDb.getItem(itemCode);

  var data= {
    item: item
  };

  if (itemCode<=0) {
    res.redirect('/categories');
  }
  else if (itemCode>itemDb.getCountofItems()) {
    res.redirect('/categories');
  }else {
    res.render('item',{data:data});
  }

});




router.get('/myitems',function(req,res) {
  if (req.session.theUser){
      if (req.session.userProfile){
        let userdb=require('../model/userprofile');
        let useritems=userdb.getUserItems();
        res.render('myitems',{UserItems:useritems});
      }
  } else{
    res.send('Please login to continue..');
  }

});



router.get('/feedback',function(req,res) {
  res.render('feedback');
});

router.get('/about',function(req,res) {
  res.render('about');
});

router.get('/about*',function(req,res) {
  res.redirect('/about');
});

router.get('/contact',function(req,res) {
  res.render('contact');
});

router.get('/contact*',function(req,res) {
  res.redirect('/contact');
});

router.get('/*',function(req,res) {
  res.redirect('/home');
});

var categories=[];

let getCategories=function(){
  var data = itemDb.getItems();
  data.forEach(function (item) {
      if(!categories.includes(item.catalogCategory)){
          categories.push(item.catalogCategory);
      }

  });
  return categories;
};

module.exports=router;
