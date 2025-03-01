const { Seller } = require("../models/sellerItem.model");

const allListedItems = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send(`Unauthorized User - Please Login!`)
        }
        const loggedInUser = req.user._id;
        const allItem = await Seller.find({
           sellerId:{$ne:loggedInUser}
        })

        if(allItem.length == 0) return res.status(404).send(`No Item Is Listed Currently!!`)
        if(!allItem) return res.status(500).send(`Error While Find Items`)

        return res.status(200).json({message:"Listed item",size:allItem.length,data:allItem});

    } catch (error) {
       return res.status(500).send(error.message); 
    }
}

// addToCart , Buy , RemoveFromCart

module.exports = allListedItems