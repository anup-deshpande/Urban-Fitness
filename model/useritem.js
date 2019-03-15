let useritem=function (itemCode,catalogCategory,itemName,Rating,TriedIt) {

    let useritemModel={
        itemCode:itemCode,
        catalogCategory:catalogCategory,
        itemName:itemName,
        Rating:Rating,
        TriedIt:TriedIt,
    };

    return useritemModel;
};

module.exports.useritem=useritem;

