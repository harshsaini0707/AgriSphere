const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminProtect = async(req,res,next)=>{
    try {
        const token = req.cookies?.adminToken;

        if(!token) return res.status(400).json({message:"Request Denied!! Token Is Not There!!"});

        const verify = jwt.verify(token,process.env.SECRET_KEY);

        if(!verify) return res.status(400).send("Something Went Wrong While Verifying Token!!");

        const {email} = verify;

        if(email != process.env.ADMIN_EMAIL){
            return res.status(400).send("Something Is Wrong While Verifying Token !!");
        }
        next();
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
}
module.exports = adminProtect;