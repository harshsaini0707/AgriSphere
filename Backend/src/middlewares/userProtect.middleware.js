const jwt = require("jsonwebtoken");
require("dotenv").config();
const {User} = require("../models/User.model")

const userProtect = async(req,res,next)=>{

    try {
        const token = req.cookies?.token;
       // console.log(token);
        
        if(!token){ 
            return res.status(401).send("Unauthorized - Please Login!"); 
        }
        const decodeData =  jwt.verify(token,process.env.SECRET_KEY);
        if(!decodeData) return res.status(401).json({message:"Unauthorized - No Token "});

        const{_id} =  decodeData;
        const user = await User.findById(_id).select("-password");

        if(!user) return res.status(404).json({message:"User Not Found!!"});
        
        req.user = user;
       // console.log(user);
        
        next();

        
    } catch (error) {
        return  res.status(500).json({message:"Middleware Error" , error})
    }
}

module.exports= userProtect;