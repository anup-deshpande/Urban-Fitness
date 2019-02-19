class item{


  constructor(id,name,muscleGroup,description,rating,imageURL){
      this._id=id;
      this._name=name;
      this._muscleGroup=muscleGroup;
      this._description=description;
      this._rating=rating;
      this._imageURL=imageURL;
  }

  get id(){
    return this._id;
  }

  set id(value){
    this._id=value;
  }

  get name(){
    return this._name;
  }

  set name(value){
    this._name=value;
  }

  get muscleGroup(){
    return this._muscleGroup;
  }

  set muscleGroup(value){
    this._muscleGroup=value;
  }

  get rating(){
    return this._rating;
  }

  set rating(value){
    this._rating=value;
  }

  get description(){
    return this._description;
  }

  set description(value){
    this._description=value;
  }
}

module.exports=item;
