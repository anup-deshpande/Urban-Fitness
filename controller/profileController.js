var express=require('express');
var itemModel=require('../model/item');
var itemDb = require('../utility/ItemDB');
var userModel=require('../model/user');
var useritemModel=require('../model/useritem');
var UserItemsDB=require('../utility/userItemDB');
var bodyParser=require('body-parser');
var session=require('express-session');

var profilerouter=express.Router();
var urlencodedParser=bodyParser.urlencoded({extended:false});

const {check,validationResult}=require('express-validator/check');

profilerouter.use(session({secret:'abcd'}));


profilerouter.get('/signIn',function (req,res) {   
    if(req.session.theUser){ 
        if(req.session.UserProfile){
            res.render('myitems',{theUser:theUser,UserItems:req.session.UserProfile});
        }
    }else{
        res.render('login',{theUser:null,UserItems:null});
    }
});


profilerouter.post('/signOut',urlencodedParser,function (req,res) {

    if(req.session.theUser){
       req.session.destroy();
       res.render('home',{theUser:null});
    }
    
});


profilerouter.post('/signIn',urlencodedParser,[
        check('UserName').not().isEmpty().isEmail(),
        check('Password').not().isEmpty().isLength({min:8})
],async function(req,res){

    if(!validationResult(req).isEmpty()){
        console.log("Error with the input : ",validationResult(req).mapped());
        res.redirect('/profile/signIn');
        return;
    }else{        
        var userObject=require('./../model/user');
        var userDB=require('./../utility/userDB');
        var username=req.body.UserName;
        var password=req.body.Password;
        
        var users=await userDB.getAllUsers(userModel);

        var flag=false;

        for(var i=0;i<users.length;i++){
                            
            if(users[i].EmailAddress==username){
                if(users[i].Password==password){
                    flag=true;
                    req.session.theUser=users[i];
                    req.session.userProfile=await UserItemsDB.getUserItems(users[i].UserID);
                    res.render('myitems',{UserItems:req.session.userProfile,theUser:req.session.theUser});            
                    
                }                
            }
        }
       
        

        if(flag==false){
            res.render('login',{theUser:null,UserItems:null});
        }

        
    }

});


profilerouter.post('/myitems',urlencodedParser,async function (req,res) {

    if(req.session.userProfile){
        if (req.body.action=="save"){
            await UserItemsDB.addUserItem(req.body.itemCode,req.session.theUser.UserID,req.body.category,req.body.itemName);
            var userItems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
            res.render('myitems',{UserItems:userItems,theUser:req.session.theUser});
        }

        else if(req.body.action=="deleteItem"){
            let userdb=require('../model/userprofile');

            await UserItemsDB.deleteUserItem(req.body.itemCode);

            let useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }



        else if (req.body.action=="updateProfile"){
            
            var itemdb=require('../utility/itemdb');
            var useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
            var item=await itemdb.getItem(req.body.itemCode,itemModel);
            

            var flag=0;

            for (let i=0;i<useritems.length;i++){
                if(req.body.itemCode==useritems[i].itemCode){
                  flag=1;                  
                  item.Rating=useritems[i].Rating;
                  item.TriedIt=useritems[i].TriedIt;
                  res.render('feedback',{theItem:item,theUser:req.session.theUser});
                }
            }

            if(flag==0){
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }


        }

        else if(req.body.action=="updateFlag"){
            if(req.body.TriedIt=="Yes"){
                UserItemsDB.addMadeit(req.body.itemCode,req.session.theUser.UserID,true);
                var useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});

            }else{
                UserItemsDB.addMadeit(req.body.itemCode,req.session.theUser.UserID,false);
                var useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }

        }

        else if(req.body.action=="updateRating"){

            var ratingVal=req.body.star;

            if(typeof ratingVal!=="undefined"){
                //console.log("Stars is : "+ratingVal);
                UserItemsDB.addItemRating(req.body.itemCode,req.session.theUser.UserID,ratingVal);
            }else {
                UserItemsDB.addItemRating(req.body.itemCode,req.session.theUser.UserID,0);
                //console.log("Stars is : 0");
            }

            var useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
            //console.log("stringify : "+JSON.stringify(useritems));
            
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }

        else if(req.body.action=="rateIt"){
            var itemdb=require('../utility/itemdb');
            var useritems=await UserItemsDB.getUserItems(req.session.theUser.UserID);
            var item=await itemdb.getItem(req.body.itemCode,itemModel);
            

            var flag=0;

            for (let i=0;i<useritems.length;i++){
                if(req.body.itemCode==useritems[i].itemCode){
                  flag=1;
                  res.render('feedback',{theItem:item,theUser:req.session.theUser});
                }
            }

            if(flag==0){
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }

        }

        
    }else{
        res.render('login',{theUser:null,UserItems:null});
    }

});

module.exports=profilerouter;