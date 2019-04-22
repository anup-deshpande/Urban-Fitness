var UserItemsModel = require('../model/useritem');

module.exports.addUserItem=function(itemCode,userID,catalogCategory,itemName){
  return new Promise((resolve,reject)=>{
    UserItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
      {$set:{UserID:userID,itemCode:itemCode, catalogCategory:catalogCategory,itemName:itemName,Rating:0,TriedIt:false}},
      {upsert:true},function(err,data){
        console.log(data);
        resolve(data);        
      }).catch(err=>{return reject(err);});
      
});
}


module.exports.addItemRating=function(itemCode,userID,rating){
  return new Promise((resolve,reject)=>{
    UserItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
      {$set:{UserID:userID,itemCode:itemCode,Rating:rating}},
      {new:true,upsert:true},function(err,data){
        //console.log(data);
        resolve(data);        
      }).catch(err=>{return reject(err);});
      
});
}

module.exports.addMadeit=function(itemCode,userID,TriedIt){
  return new Promise((resolve,reject)=>{
    UserItemsModel.findOneAndUpdate({$and:[{UserID:userID},{itemCode:itemCode}]},
      {$set:{UserID:userID,itemCode:itemCode,TriedIt:TriedIt}},
      {new:true,upsert:true},function(err,data){
        resolve(data);        
      }).catch(err=>{return reject(err);});
      
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






