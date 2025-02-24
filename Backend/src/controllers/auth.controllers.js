const { ValidateData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { User } = require("../models/User.model");
require("dotenv").config();

const signup = async(req,res)=>{
    try {

        const {firstName , lastName , email , password } = req.body;

        ValidateData(req);

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        const newUser =  await user.save();

        const token = await newUser.getJWT();
        if(!token){
            return res.status(401).json({messgage:"Token not created!!"})
        }
       res.cookie("token",token,{
        httpOnly:true,
        sameSite:"strict"
       })

       return res.status(200).json({
        messgage:"User Created Successfully!!",
        data:newUser
       })
   
    } catch (error) {
        return res.status(500).json(error.message);  
    }
    
}


const login = async(req,res)=>{
try {
    
    const {email , password} =req.body;
    if(!email)return res.status(400).json({message:"Enter Email!!"});
    if(!password)return res.status(400).json({message:"Enter Password!!"});

    const user = await User.findOne({email:email}).select("-passwrod")

    if(!user) return res.status(500).json({message:"Invalid Credentials"})

    const validPassword = await user.comparePassword(password);
    if(validPassword){

        const token = await user.getJWT();
        
        if(!token){
            return res.status(401).json({messgage:"Token not created!!"})
        }
        res.cookie("token",token,{
            httpOnly:true,
        })       

    }else{
       return res.status(400).json({message:"Incorrect Password!!"});   
    }

    return res.status(200).json({message:"Login Successfully!",
        data:user
    })
} catch (error) {
    return res.status(500).json(error.message); 
}
}


const logout = async(req,res)=>{
    try {

        res.cookie("token",null,{
            expires:new Date(Date.now())
        })
        return res.status(200).json({message:"Logout Successfully!!"})
        
    } catch (error) {
        return res.status(500).json(error.message); 
    }
    }

module.exports={signup,login,logout}