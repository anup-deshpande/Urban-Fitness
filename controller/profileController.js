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

profilerouter.use(session({secret:'abcd'}));

profilerouter.post('/signin',urlencodedParser,async function (req,res) {
    
   /* var userObject=require('./../model/user');
    var userDB=require('./../utility/userDB');
   // let userprofile=require('./../model/userprofile');

    userObject=await userDB.getUser(1,userModel);

    req.session.theUser=userObject;
    req.session.userProfile=await UserItemsDB.getUserItems(1);*/
    res.render('login',{theUser:null,UserItems:null});
    //res.render('myitems',{UserItems:req.session.userProfile,theUser:req.session.theUser});

});


profilerouter.post('/signOut',urlencodedParser,function (req,res) {

    if(req.session.theUser){
       req.session.destroy();
        res.render('home',{theUser:null});
    }
    
});




profilerouter.post('/myitems',urlencodedParser,async function (req,res) {

    if(req.session.userProfile){
        if (req.body.action=="save"){
            await UserItemsDB.addUserItem(req.body.itemCode,1,req.body.category,req.body.itemName);
            var userItems=await UserItemsDB.getUserItems(1);
            res.render('myitems',{UserItems:userItems,theUser:req.session.theUser});
        }

        else if(req.body.action=="deleteItem"){
            let userdb=require('../model/userprofile');

            await UserItemsDB.deleteUserItem(req.body.itemCode);

            let useritems=await UserItemsDB.getUserItems(1);
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }



        else if (req.body.action=="updateProfile"){
            
            var itemdb=require('../utility/itemdb');
            var useritems=await UserItemsDB.getUserItems(1);
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
                UserItemsDB.addMadeit(req.body.itemCode,1,true);
                var useritems=await UserItemsDB.getUserItems(1);
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});

            }else{
                UserItemsDB.addMadeit(req.body.itemCode,1,false);
                var useritems=await UserItemsDB.getUserItems(1);
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }

        }

        else if(req.body.action=="updateRating"){

            var ratingVal=req.body.star;

            if(typeof ratingVal!=="undefined"){
                console.log("Stars is : "+ratingVal);
                UserItemsDB.addItemRating(req.body.itemCode,1,ratingVal);
            }else {
                UserItemsDB.addItemRating(req.body.itemCode,1,0);
                console.log("Stars is : 0");
            }

            var useritems=await UserItemsDB.getUserItems(1);
            console.log("stringify : "+JSON.stringify(useritems));
            
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }

        else if(req.body.action=="rateIt"){
            var itemdb=require('../utility/itemdb');
            var useritems=await UserItemsDB.getUserItems(1);
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