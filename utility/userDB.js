var User = require('../model/user');

module.exports.getUsers = function () {

    let users = [];
    for (let i = 0; i < data.length; i++) {
        let user = new user(data[i].UserID,
            data[i].FirstName,
            data[i].LastName,
            data[i].EmailAddress,
            data[i].Address1,
            data[i].Address2,
            data[i].City,
            data[i].State,
            data[i].ZipCode,
            data[i].Country
        );

        users.push(user);

    }
    return users;
};

module.exports.getUser=function(userID){

    let user;

    for(var i=0;i<data.length;i++){
        if(data[i].UserID == userID){
             user = new User(data[i].UserID,
                data[i].FirstName,
                data[i].LastName,
                data[i].EmailAddress,
                data[i].Address1,
                data[i].Address2,
                data[i].City,
                data[i].State,
                data[i].ZipCode,
                data[i].Country
            );



        }
    }

    return user;


};
module.exports.getCountofUsers = function(){
    return data.length;
};


var data = [
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
    }];
