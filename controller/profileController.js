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

    res.render('myitems',{UserItems:req.session.userProfile});

});


profilerouter.post('/myitems',urlencodedParser,function (req,res) {

    if(req.session.userProfile){
        if (req.body.action=="saveIt"){
            let userdb=require('../model/userprofile');

            userdb.addUserItem(req.body.itemCode,req.body.category,req.body.itemName,0,false);

            let useritems=userdb.getUserItems();
            res.render('myitems',{UserItems:useritems});



        }

        else if(req.body.action=="delete"){
            let userdb=require('../model/userprofile');

            userdb.deleteUserItem(req.body.itemCode);

            let useritems=userdb.getUserItems();
            res.render('myitems',{UserItems:useritems});
        }


        else if(req.body.action=="rateIt"){
            console.log('Rate Button Clicked');
        }

    }else{
        res.send('No Session Found');
    }

});

module.exports=profilerouter;