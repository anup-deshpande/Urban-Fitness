var express=require('express');
var item=require('../model/item');
var itemDb = require('../utility/ItemDB');
var user=require('../model/user');
var useritem=require('../model/useritem');
var bodyParser=require('body-parser');
var session=require('express-session');

var profilerouter=express.Router();
var urlencodedParser=bodyParser.urlencoded({extended:false});

profilerouter.use(session({secret:'abcd'}));

profilerouter.post('/signin',urlencodedParser,function (req,res) {
    var userObject=require('./../model/user');
    var userDB=require('./../utility/userDB');
    let userprofile=require('./../model/userprofile');

    userObject=userDB.getUser(1);


    req.session.theUser=userObject;
    req.session.userProfile=userprofile.getUserItems();

    res.render('myitems',{UserItems:req.session.userProfile,theUser:req.session.theUser});

});


profilerouter.post('/myitems',urlencodedParser,function (req,res) {

    if(req.session.userProfile){
        if (req.body.action=="save"){
            let userdb=require('../model/userprofile');

            userdb.addUserItem(req.body.itemCode,req.body.category,req.body.itemName,0,false);
            let useritems=userdb.getUserItems();
            res.render('myitems',{UserItems:useritems});
        }

        else if(req.body.action=="deleteItem"){
            let userdb=require('../model/userprofile');

            userdb.deleteUserItem(req.body.itemCode);

            let useritems=userdb.getUserItems();
            res.render('myitems',{UserItems:useritems});
        }



        else if (req.body.action=="updateProfile"){
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
                  res.render('feedback',{theItem:item});
                }
            }

            if(flag==0){
                res.render('myitems',{UserItems:useritems});
            }


        }

        else if(req.body.action=="updateFlag"){
            if(req.body.TriedIt=="Yes"){
                let userdb=require('../model/userprofile');
                let itemdb=require('../utility/itemdb');
                userdb.updateUserItem(req.body.itemCode,null,"Yes",0);
                let useritems=userdb.getUserItems();
                res.render('myitems',{UserItems:useritems});

            }else{
                let userdb=require('../model/userprofile');
                let itemdb=require('../utility/itemdb');
                userdb.updateUserItem(req.body.itemCode,null,"No",0);
                let useritems=userdb.getUserItems();
                res.render('myitems',{UserItems:useritems});
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
            res.render('myitems',{UserItems:useritems});
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
                    res.render('feedback',{theItem:item});
                }
            }

            if(flag==0){
                res.render('myitems',{UserItems:useritems});
            }

        }

    }else{
        res.send('No Session Found');
    }

});

module.exports=profilerouter;