class item{


  constructor(itemCode,itemName,catalogCategory,Description,Rating,imageURL){
      this.itemCode=itemCode;
      this.itemName=itemName;
      this.catalogCategory=catalogCategory;
      this.Description=Description;
      this.Rating=Rating;
      this.imageURL=imageURL;
  }

  get itemCode(){
    return this._itemCode;
  }

  set itemCode(value){
    this._itemCode=value;
  }

  get itemName(){
    return this._itemName;
  }

  set itemName(value){
    this._itemName=value;
  }

  get catalogCategory(){
    return this._catalogCategory;
  }

  set catalogCategory(value){
    this._catalogCategory=value;
  }

  get Rating(){
    return this._Rating;
  }

  set Rating(value){
    this._Rating=value;
  }

  get Description(){
    return this._Description;
  }

  set Description(value){
    this._Description=value;
  }

  get imageURL(){
  
    return this._imageURL;
  }

  set imageURL(value){

    this._imageURL=value;
  }
}

module.exports=item;
