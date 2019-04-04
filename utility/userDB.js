var User = require('../model/user');


module.exports.getAllUsers = function (db) {
    return new Promise((resolve,reject)=>{
        db.find({})
            .then(data => {
                resolve(data);
            }).catch(err=>{return reject(err); })
    })      
};

module.exports.getUser=function(userID,db){

    return new Promise((resolve,reject)=>{
        db.findOne({UserID:userID})
            .then(data => {
                resolve(data);
            }).catch(err=>{return reject(err); })
    })
};

module.exports.getCountofUsers = function(){
    return data.length;
};


/*var data = [
    {
        UserID: 1,
        FirstName: "Bob",
        LastName: "Smith",
        EmailAddress:"bobsmith@gmail.com",
        Address1: "9515, University Terrace Drive",
        Address2: "Apartment D",
        City: "Charlotte",
        State: "NC",
        ZipCode: 28262,
        Country: "United States",
    }];*/
