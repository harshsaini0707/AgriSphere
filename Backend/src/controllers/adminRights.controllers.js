const {adminModel} = require("../models/admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminLogin = async(req,res)=>{
    try {
        const{email,password}  = req.body;

        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            
            const token =  jwt.sign({email},process.env.SECRET_KEY,{
                expiresIn:"1d"
            })
            if(!token) return res.status(400).send("Error While Genrating Token!!");

            res.cookie("adminToken",token,{
                httpOnly:true,
                secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            })
            return res.status(200).send("Login Successfull!!")
        }else{
            return res.status(404).send("Invalid Credentials!!")
        }

    } catch (error) {
        return res.status(500).send("Error In Admin Login!! "+error.message);
    }
}

const adminLogout = async(req,res)=>{
    try {
        res.cookie("adminToken",null,{
            expires: new Date(Date.now())
        })
        return res.status(200).json({message:"Logout Successfull!!"})
        
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const addCrop = async(req,res)=>{
    try {
        const {cropName,cropPhoto,about,soilType,duration,state,nutrition,optimalConditions,market,waterRequirement,season,seedRequired} = req.body;
        
        if(!cropName || !cropPhoto || !about || !soilType || !state || !season || !duration || !seedRequired){
            return res.status(400).json({message:"Missing Field!!"})
        }
        const crop = new adminModel({
            cropName,cropPhoto,about,soilType,duration,state,nutrition,optimalConditions,market,waterRequirement,season,seedRequired
        })

        await crop.save();

        return res.status(200).json({message:"Crop Added Successfully" , data : crop });

    } catch (error) {
        return res.status(500).send("Error While Adding Crop "+error.message)
    }
}

const editCrop = async(req,res)=>{
    try {

        const cropId = req.params.cropId;

        const cropFind = await adminModel.findById(cropId);

        if(!cropFind) return res.status(404).send("Crop Not Found!!");

        Object.keys(req.body).forEach((key) => {
            cropFind[key] = req.body[key];
        });

        await cropFind.save();

        return res.status(200).json({
            message: "Crop Edited Successfully",
            data: cropFind,
        });
        
    } catch (error) {
        return res.status(500).send("Error While Editing Crop "+error.message)
    }
}

const deleteCrop = async(req,res)=>{
    try {
        const cropId = req.params.cropId;

        if (!cropId) {
            return res.status(400).json({ message: "Crop Id is required" });
        }
        const cropFind = await adminModel.findByIdAndDelete(cropId);

        if(!cropFind) return res.status(404).send("Crop Not Found!!");

        return res.status(200).json({message:"Crop Deleted Successfully ",data:cropFind});
        
    } catch (error) {
        return res.status(500).send("Error While Deleting Crop "+error.message)
    }
}

const feed = async(req,res)=>{
    try {
        const feed = await adminModel.find({});
        if(feed.length == 0 )return res.status(404).send("No Crop Available Add New Crops")
        return res.status(200).json({size:feed.length,data:feed});


    } catch (error) {
        return res.status(500).send("Error In Crop Feed!!");
    }
}


module.exports = {addCrop,editCrop,deleteCrop,feed,adminLogin,adminLogout}