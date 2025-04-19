const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                return res.json({message:value+"Not a vlaid Email Type"})
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    State:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
        
    },
    profilePhoto:{
        type:String,
        default:""
    }

},{timestamps:true});


userSchema.methods.getJWT  = async function(){
 const user = this;

 const token =  jwt.sign({_id:user._id},process.env.SECRET_KEY,{
    expiresIn:"1d"
 })

 if(!token ) return res.json({message:"Enable to generate Token!!"})
  
 return token;
}

userSchema.methods.comparePassword = async function(InputPassword){
    const user = this;
    const password = user.password;

    const valid = await bcrypt.compare(InputPassword,password);
    return valid;
}

const User = mongoose.model("User",userSchema);
module.exports={User};