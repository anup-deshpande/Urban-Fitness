var express=require('express');
var itemDb = require('../utility/ItemDB');
var itemModel=require('../model/item');
var useritemModel=require('../model/useritem');
var bodyParser=require('body-parser');
var session=require('express-session');
var user=require('../model/user');
var userDB=require('../utility/userDB');
var UserItemsDB=require('../utility/userItemDB');

var router=express.Router();
var urlencodedParser=bodyParser.urlencoded({extended:false});

var mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/UrbanFitnessDB',{useNewUrlParser:true});

router.use(session({secret:'abcd'}));

router.get('/',urlencodedParser,function(req,res) {
  if(req.session.theUser){
    res.render('home',{theUser:req.session.theUser});
  }else{
    res.render('home',{theUser:null});
  }

});

router.get('/home',urlencodedParser,function(req,res) {
  if(req.session.theUser){
    //let theUser=userDB.getUser(req.session.theUser.);
    res.render('home',{theUser:req.session.theUser});
    //console.log("user is:"+JSON.stringify(req.session.theUser));
  }else{
    res.render('home',{theUser:null});
  }
});

router.get('/home*',function(req,res){
  if(req.session.theUser) {
    res.redirect('home',{theUser:req.session.theUser});
  }else{
    res.redirect('home',{theUser:null});
  }
});


router.get('/categories',async function(req,res) {

 
/*
  var categorySchema=new mongoose.Schema({
      CategoryID:Number,
      CategoryName:String
  },{collection:'Categories'});

  var categoryModel=mongoose.model('CategoryModel',categorySchema);


  var categories=await getCategories(categoryModel);*/
 
  var categories=await getCategories();
  var itemData= await itemDb.getAllItems(itemModel);
  
  
  var data= {
    categories: categories,
    items: itemData
  };

  if(req.session.theUser) {
    res.render('categories',{data: data,theUser:req.session.theUser});
  }else{
    res.render('categories',{data: data,theUser:null});
  }

});


router.get('/categories/item',async function(req,res) {
  var itemCode=req.query.itemCode;
  var item= await itemDb.getItem(itemCode,itemModel);

  var data= {
    item: item
  };

  if(req.session.theUser) {
    if (itemCode<=0) {
      res.redirect('/categories',{theUser:req.session.theUser});
    }
    else if (itemCode>itemDb.getCountofItems(itemModel)) {
      res.redirect('/categories',{theUser:req.session.theUser});
    }else {
      res.render('item',{data:data,theUser:req.session.theUser});
    }

  }else{
    res.render('item',{data:data,theUser:null});
  }

});




router.get('/myitems',async function(req,res) {

  
    if (req.session.theUser){
      if (req.session.userProfile){  
        var useritems=await UserItemsDB.getUserItems(1);
        res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
      }
  } else{
    res.send('Please login to continue..');
  }

});



router.get('/feedback',function(req,res) {
  if(req.session.theUser){
    res.render('feedback',{theUser:req.session.theUser});
  }else{
    res.render('feedback',{theUser:null});
  }
});

router.get('/about',function(req,res) {
  if(req.session.theUser){
    res.render('about',{theUser:req.session.theUser});
  }else{
    res.render('about',{theUser:null});
  }
});

router.get('/about*',function(req,res) {
  if(req.session.theUser){
    res.redirect('/about',{theUser:req.session.theUser});
  }else{
    res.redirect('/about',{theUser:null});
  }
});

router.get('/contact',function(req,res) {
  if(req.session.theUser){
    res.render('contact',{theUser:req.session.theUser});
  }else{
    res.render('contact',{theUser:null});
  };
});

router.get('/contact*',function(req,res) {
  if(req.session.theUser){
    res.redirect('/contact',{theUser:req.session.theUser});
  }else{
    res.redirect('/contact',{theUser:null});
  }
});

router.get('/*',function(req,res) {
  if(req.session.theUser){
    res.redirect('/home');
  }else{
    res.redirect('/home');
  }
});

var categories=[];

var getCategories= async function(){
  var data = await itemDb.getAllItems(itemModel);
  
  for(var i=0;i<data.length;i++){
    if(!categories.includes(data[i].catalogCategory)){
      categories.push(data[i].catalogCategory);
    }
  }
  
  return categories;
};

module.exports=router;
