const { cartModel } = require("../models/cart.model");
const { OrderModel } = require("../models/order.model");
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
            return res.status(400).json({message:"Quantity must be atleast one!",data:`Quantity must be atleast one!`})
            
        }
        if(quantity > item.quantity){
            return res.status(400). json({message:"Requested quantity exceeds the available stock!",data:`Requested quantity exceeds the available stock!`})
           
        }

        const cartItemExists = await cartModel.findOne({itemId , buyerId : loggedInUser});
        if(cartItemExists){
            return res.status(400).json({message:"Item is Already In Your Cart!!",data:`Item is Already In Your Cart!!`});
            
        }
        let totalPrice = item.price * quantity;


        const cartData = new cartModel({
            itemId:itemId,
            sellerId:item.sellerId,
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

        const cartList = await cartModel.find({buyerId:loggedInUser}).populate("itemId", "cropName cropPhoto availability cropType about season")
        .populate("sellerId","firstName lastName email");
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

const buyItem = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).send('Unauthorized User - Please Login!');
        }

        const itemId = req.params.ItemId;
        if (!itemId) {
            return res.status(400).send('Item ID is required!');
        }
        const {address} = req.body;

        if(!address){
            return res.status(400).send('Address Is Required!'); 
        }

        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).send('Quantity Invalid!');
        }

        const loggedInUser = req.user._id;

        const item = await Seller.findOne({ _id: itemId }); // Fix the item lookup

        if (!item) {
            return res.status(404).send('Item not found!');
        }

        if (quantity > item.quantity) {
            return res.status(400).send('Requested quantity exceeds available stock!');
        }

        const totalPrice = quantity * item.price;

        const order = new OrderModel({
            sellerId: item.sellerId,
            buyerId: loggedInUser,
            itemId: itemId,
            quantity: quantity,
            totalPrice: totalPrice,
            address:address
        });

        item.quantity -= quantity;

        await order.save();
        await item.save(); 

        await cartModel.findOneAndDelete({ itemId, buyerId: loggedInUser });

        return res.status(201).json({ message: 'Order placed Successfully!!', data: order });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};



const buyerOrder =  async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send(`Unauthorized User - Please Login!`);
        }
        const loggedInUser = req.user._id;

        const order =  await OrderModel.find({buyerId: loggedInUser})
        .populate("itemId","cropName cropPhoto price cropType season about")
        .sort({orderDate:-1})
        
        if(!order || order.length === 0) return res.status(404).send(`No Order Placed !`);

        return res.status(200).json({message:"All Orders", size:order.length , data:order})

    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const aboutItem= async(req,res)=>{
    try {  
        const ItemId = req.params.ItemId;
            
        if(!ItemId) return res.status(404).send(`ItemId Required!!`);

        const item = await Seller.findById(ItemId);
        
        if(!item) return res.status(404).send(`Item Not Exist!`);

        return res.status(200).json({message:`About Item`,data:item});

    } catch (error) {
       return res.status(500).send(error.message); 
    }
}


module.exports = {allListedItems , addToCart , cartList , removeItem , buyItem , buyerOrder,aboutItem}