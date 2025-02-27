const { Seller } = require("../models/sellerItem.model");

const listCrop = async(req,res)=>{
    try {
       if(!req.user || !req.user._id){
        return res.status(401).send("Unauthorized User - Login!")
       }

       const loggedInUser = req.user._id;
        
       const{
        cropName,
        cropPhoto,
        availability,
        price,
        cropType,
        season,
        quantity,
        about,
        demand

       }= req.body;


       const product = await Seller({
        cropName,
        cropPhoto,
        sellerId:loggedInUser,
        availability,
        price,
        cropType,
        season,
        quantity,
        about,
        demand
       });


       if(!product) return res.status(400).send("Error While Listing item")
       await product.save();


       return res.status(201).json({message:"Item Listed Successfully!",data:product})

    } catch (error) {
        return res.status(500).send(error.message+" Error While ListingCrop")
    }
}

module.exports = listCrop