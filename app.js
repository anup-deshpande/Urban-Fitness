var express=require('express');
var app=express();
var routes=require('./controller/catalogController.js');
var profileroutes=require('./controller/profileController.js');
var mongoose=require('mongoose');
var expressValidator = require('express-validator');

mongoose.connect('mongodb://localhost:27017/UrbanFitnessDB',{useNewUrlParser:true});

var db=mongoose.connection;

db.on('error',console.error.bind(console,'connection error : '));
db.once('open',function(){
    console.log('Successfully connected to database');
});

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));

app.use('/',routes);
app.use('/profile',profileroutes);

app.get('/*',function(req,res) {
    if(req.session.theUser){
      res.redirect('/home');
    }else{
      res.redirect('/home');
    }
  });


app.use(expressValidator());

app.listen(8080,function(req,res){
    console.log('App started');
    console.log('Listening on port 8080');
});
