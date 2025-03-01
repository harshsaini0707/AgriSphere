const { cartModel } = require("../models/cart.model");
const { Seller } = require("../models/sellerItem.model");

const allListedItems = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send(`Unauthorized User - Please Login!`)
        }
        const loggedInUser = req.user._id;
        const allItem = await Seller.find({
           sellerId:{$ne:loggedInUser}
        }).populate("sellerId","firstName lastName State Location profilePhoto")

        if(allItem.length == 0) return res.status(404).send(`No Item Is Listed Currently!!`)
        if(!allItem) return res.status(500).send(`Error While Find Items`)

        return res.status(200).json({message:"Listed item",size:allItem.length,data:allItem});

    } catch (error) {
       return res.status(500).send(error.message); 
    }
}

const addToCart = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send("Unauthorized User - Please Login !")
        }
        const loggedInUser = req.user._id;
        const itemId = req.params.itemId;
        if(!itemId) return res.status(404).send(`Item Id Required!`)
        
        const item = await Seller.findById(itemId);
        if(!item) return res.status(404).send(`Item Not Exists!`);

        const{quantity} = req.body;

        if(!quantity || quantity<=0){
            return res.status(400).send(`Quantity must be atleast one!`)
        }
        if(quantity > item.quantity){
            return res.status(400).send(`Requested quantity exceeds the available stock!`)
        }

        const cartItemExists = await cartModel.findOne({itemId , buyerId : loggedInUser});
        if(cartItemExists){
            return res.status(400).send(`Item is Already In Your Cart!!`);
        }
        let totalPrice = item.price * quantity;


        const cartData = new cartModel({
            itemId:itemId,
            itemName:item.cropName,
            quantity:quantity,
            price:item.price,
            buyerId:loggedInUser,
            totalPrice:totalPrice

        })
        if(!cartData) return res.status(500).send(`Error While Adding Item TO Cart`);

        await cartData.save();

        return res.status(201).json({message:"Item Added To Cart Successfully!",data:cartData})


    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const cartList = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(500).send(`Unauthorized User - Please Login!`)
        }
        const loggedInUser = req.user._id;

        const cartList = await cartModel.find({buyerId:loggedInUser}).populate("itemId", "cropName cropPhoto availability cropType about season");
        if(!cartList) return res.status(400).send(`Error while fetching user data`);
        if(cartList.length === 0) return res.status(404).send(`Empty Cart!`)

        return res.status(200).json({message:"All Items", size:cartList.length , data:cartList})
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const removeItem = async (req, res) => {

    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send("Unauthorized User - Please Login!");
        }

        const loggedInUser = req.user._id;
        const itemId = req.params.itemId;

        if (!itemId) return res.status(400).send("Item ID is required!");
        const item = await cartModel.findOne({ _id: itemId, buyerId: loggedInUser });

        if (!item) {
            return res.status(404).send("Item not found in your cart!");
        }

        await cartModel.findByIdAndDelete(itemId);

        return res.status(200).json({ message: "Item removed successfully!", data: item });

    } catch (error) {
        return res.status(500).send("Error while removing item: " + error.message);
    }
};


//  Buy 

module.exports = {allListedItems , addToCart , cartList , removeItem}