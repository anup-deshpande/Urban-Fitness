var express=require('express');
var app=express();
var routes=require('./routes/RouteHandler.js');

app.set('view engine','ejs');
app.use('/assets',express.static('assets'));
app.use('/',routes);

app.listen(8080,function(req,res){
    console.log('App started');
    console.log('Listening on port 8080');
});
