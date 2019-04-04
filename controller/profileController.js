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
    var userObject=require('./../model/user');
    var userDB=require('./../utility/userDB');
    let userprofile=require('./../model/userprofile');

    userObject=await userDB.getUser(1,userModel);


    req.session.theUser=userObject;
    req.session.userProfile=await userprofile.getUserItems(userModel);

    res.render('myitems',{UserItems:req.session.userProfile,theUser:req.session.theUser});

});


profilerouter.post('/signOut',urlencodedParser,function (req,res) {

    req.session.destroy();
    res.render('home',{theUser:null});

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

            let useritems=await userdb.getUserItems();
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }



        else if (req.body.action=="updateProfile"){
            
            var itemdb=require('../utility/itemdb');
            var useritems=await UserItemsDB.getUserItems(1);
            var item=await itemdb.getItem(req.body.itemCode,itemModel);
            

            let flag=0;

            for (let i=0;i<useritems.length;i++){
                if(req.body.itemCode==useritems[i].itemCode){
                  flag=1;
                  console.log("Stringify : "+JSON.stringify(item));
                  
                  res.render('feedback',{theItem:item,theUser:req.session.theUser});
                }
            }

            if(flag==0){
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }


        }

        else if(req.body.action=="updateFlag"){
            if(req.body.TriedIt=="Yes"){
                let userdb=require('../model/userprofile');
                let itemdb=require('../utility/itemdb');
                userdb.updateUserItem(req.body.itemCode,null,"Yes",0);
                let useritems=userdb.getUserItems();
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});

            }else{
                let userdb=require('../model/userprofile');
                let itemdb=require('../utility/itemdb');
                userdb.updateUserItem(req.body.itemCode,null,"No",0);
                let useritems=userdb.getUserItems();
                res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
            }

        }

        else if(req.body.action=="updateRating"){
            let userdb=require('../model/userprofile');
            let itemdb=require('../utility/itemdb');


            let ratingVal=req.body.star;
            if(typeof ratingVal!=="undefined"){
                console.log("Stars is : "+ratingVal);
                userdb.updateUserItem(req.body.itemCode,ratingVal,null,1);
            }else {
                userdb.updateUserItem(req.body.itemCode,0,null,1);
                console.log("Stars is : 0");
            }
            let useritems=userdb.getUserItems();
            res.render('myitems',{UserItems:useritems,theUser:req.session.theUser});
        }

        else if(req.body.action=="rateIt"){
            let userdb=require('../model/userprofile');
            let itemdb=require('../utility/itemdb');
            //userdb.updateUserItem(req.body.itemCode,req.body.itemRating,req.body.itemTriedIt);
            let useritems=userdb.getUserItems();
            let item=itemdb.getItem(req.body.itemCode);
            //item.Rating=req.body.itemRating;

            let flag=0;

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
        res.send('Please sign in to continue..');
    }

});

module.exports=profilerouter;