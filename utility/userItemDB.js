var UserItemsModel = require('../model/useritem');

module.exports.addUserItem=function(itemCode,userID,catalogCategory,itemName){
  
    
  var UserItem=new UserItemsModel({
    UserID: userID,
    itemCode: itemCode,
    itemName: itemName,
    catalogCategory: catalogCategory,
   /* Rating: 0,
    TriedIt:false*/
  });

  UserItem.save(function(err){
    
    if (err) {
      console.log(err);
    }else{
      console.log("new item Added to the database");
    }

  });
}


module.exports.getUserItems=function(userID){
  return new Promise((resolve,reject)=>{
    UserItemsModel.find({UserID:userID})
        .then(data => {
            resolve(data);
        }).catch(err=>{return reject(err); })
});
}


module.exports.deleteUserItem=function(code){
  return new Promise((resolve,reject)=>{
    UserItemsModel.deleteOne({itemCode:code})
        .then(data => {
            resolve(data);
        }).catch(err=>{return reject(err); })
});
}


