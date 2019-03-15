let userItemsList=[];
let userItemModel=require('../model/useritem');

let userProfile=function (userID) {

    let userProfileModel={
        userID:userID,
        userItems:userItemsList
    };

    return userProfileModel;
};


module.exports.getUserItems=function(){
    return userItemsList;
}

module.exports.addUserItem=function(itemCode,catalogCategory,itemName,Rating,TriedIt){

    userItemModel=require('../model/useritem');
    userItemModel=userItemModel.useritem(itemCode,catalogCategory,itemName,Rating,TriedIt);

    let flag=0;

    for(let i=0;i<userItemsList.length;i++)
    {
        if(userItemsList[i].itemCode==itemCode) {
           flag=1;
        }
    }

    if (flag==0){
        userItemsList.push(userItemModel);
    }

}

module.exports.deleteUserItem=function(itemCode){

    for(let i=0;i<userItemsList.length;i++)
    {
        if(userItemsList[i].itemCode==itemCode) {
            userItemsList.splice(i,1);
        }
    }
}



module.exports.userProfile=userProfile;




