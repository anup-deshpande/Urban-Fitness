var mongoose = require('mongoose');


var UserItemSchema = new mongoose.Schema({
  UserID: {type: Number,required:true},
  itemCode: {type : Number,required:true},
  itemName: String,
  catalogCategory: String,
  Rating:{type:Number,default:0}, 
  TriedIt:{type:Boolean,default:false}
},{collection: 'UserItems'});

module.exports=mongoose.model('userItemsModel',UserItemSchema);




/*let useritem=function (itemCode,catalogCategory,itemName,Rating,TriedIt) {

    let useritemModel={
        itemCode:itemCode,
        catalogCategory:catalogCategory,
        itemName:itemName,
        Rating:Rating,
        TriedIt:TriedIt,
    };

    return useritemModel;
};

module.exports.useritem=useritem;*/

