var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var userSchema=new Schema({
    UserID:Number,
    Password:String,
    FirstName:String,
    LastName:String,
    EmailAddress:String,
    Address1:String,
    Address2:String,
    City:String,
    State:String,
    ZipCode:Number,
    Country:String
  },{collection:'Users'});
  
  module.exports=mongoose.model('userModel',userSchema);


/*class user{


    constructor(UserID,FirstName,LastName,EmailAddress,Address1,Address2,City,State,ZipCode,Country){
        this.UserID=UserID;
        this.FirstName=FirstName;
        this.LastName=LastName;
        this.EmailAddress=EmailAddress;
        this.Address1=Address1;
        this.Address2=Address2;
        this.City=City;
        this.State=State;
        this.ZipCode=ZipCode;
        this.Country=Country;
    }

    get UserID(){
        return this._UserID;
    }

    set UserID(value){
        this._UserID=value;
    }

    get FirstName(){
        return this._FirstName;
    }

    set FirstName(value){
        this._FirstName=value;
    }

    get LastName(){
        return this._LastName;
    }

    set LastName(value){
        this._LastName=value;
    }

    get EmailAddress(){
        return this._EmailAddress;
    }

    set EmailAddress(value){
        this._EmailAddress=value;
    }

    get Description(){
        return this._Description;
    }

    set Description(value){
        this._Description=value;
    }

    get Address1(){

        return this._Address1;
    }

    set Address1(value){

        this._Address1=value;
    }


    get Address2(){

        return this._Address2;
    }

    set Address2(value){

        this._Address2=value;
    }


    get City(){

        return this._City;
    }

    set City(value){

        this._City=value;
    }


    get State(){

        return this._State;
    }

    set State(value){

        this._State=value;
    }


    get ZipCode(){

        return this._ZipCode;
    }

    set ZipCode(value){

        this._ZipCode=value;
    }


    get Country(){

        return this._Country;
    }

    set Country(value){

        this._Country=value;
    }

}

module.exports=user;*/
