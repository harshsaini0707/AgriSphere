const { Seller } = require("../models/sellerItem.model");
const { all } = require("../routes/seller.routes");

//Self
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

const editListedItem = async(req,res)=>{
    try {

        if(!req.user || !req.user._id){
            return res.status(401).send("Unauthorized User - Please Login!")
        }
        const itemId = req.params.itemId;

        if(!itemId) return res.status(404).send("Need The Id Of Items TO Edit!!")

        const item = await Seller.findById(itemId);
        if(!item) return res.status(404).send("Item Not Found In Records!!")


        if(item.sellerId.toString() !== req.user._id.toString()){
            return res.status(403).send("You Can Only Edit Your Own Item Only!!");
        }
        Object.keys(req.body).forEach((k)=>{
            item[k] = req.body[k];
        })
       
        await item.save();

        return res.status(201).json({message:"Item Edited Successfully!" , data : item});

        
    } catch (error) {
        return res.status(500).send("Error while Editing Listed item "+error.message);
    }
}
const deleteItem = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send("Unauhtorized User - Please Login!");
        }

        const itemId = req.params.itemId;

        if(!itemId) return res.status(400).send("Item ID Required!!");

        const item = await Seller.findById(itemId);
        if(!item) return res.status(404).send("Item With The Given ID Is Not Present!!");

        if(item.sellerId.toString() !== req.user._id.toString()){
            return res.status(403).send("You Can Only Delete Your Item !!")
        }
        const deleteItem = await Seller.findByIdAndDelete(itemId);
        if(!deleteItem) return res.status(500).send("Error While Deleting Item "+error.message);

        return res.status(200).json({meassge:"Item Deleted Sucessfully!",data:deleteItem});

        
    } catch (error) {
       return res.status(500).send("Error While Deleting Item!",error.meassge); 
    }
}

const getItem  = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send("Unauthorized User - Please Login !!");
        }
        const loggedInUser = req.user._id;

        const user = await Seller.find({sellerId : loggedInUser});
        if(!user) return res.status(500).send(`No User Existed With The Given Credentials!!`)
        if(user.length == 0) return res.status(404).send(`No Item is Listed!!`) 

        return res.status(201).json({message:`All Listed Item`,size:user.length , data:user});
        
    } catch (error) {
       return res.status(500).send(`Error While Getting Item List`+error.message) 
    }
}







module.exports = { listCrop , editListedItem ,deleteItem , getItem}