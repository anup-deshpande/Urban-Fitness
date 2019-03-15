var express=require('express');
var app=express();
var routes=require('./controller/catalogController.js');
var profileroutes=require('./controller/profileController.js');

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use('/',routes);
app.use('/profile',profileroutes);

app.listen(8080,function(req,res){
    console.log('App started');
    console.log('Listening on port 8080');
});
