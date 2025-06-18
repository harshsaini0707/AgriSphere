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

const addToCart = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send("Unauthorized User - Please Login!");
    }

    const loggedInUser = req.user._id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (!itemId) {
      return res.status(400).send("Item ID is required!");
    }

    const item = await Seller.findById(itemId);
    if (!item) {
      return res.status(404).send("Item does not exist!");
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be at least one!",
        data: "Quantity must be at least one!"
      });
    }

    if (quantity > item.quantity) {
      return res.status(400).json({
        message: "Requested quantity exceeds available stock!",
        data: "Requested quantity exceeds available stock!"
      });
    }

    const cartItemExists = await cartModel.findOne({
      itemId,
      buyerId: loggedInUser,
      buyStatus: false
    });

    if (cartItemExists) {
      return res.status(400).json({
        message: "Item is already in your cart!",
        data: "Item is already in your cart!"
      });
    }

    const totalPrice = item.price * quantity;

    const cartData = new cartModel({
      itemId: itemId,
      sellerId: item.sellerId,
      itemName: item.cropName,
      quantity: quantity,
      price: item.price,
      buyerId: loggedInUser,
      totalPrice: totalPrice
    });

    await cartData.save();

    return res.status(201).json({
      message: "Item added to cart successfully!",
      data: cartData
    });

  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).send(error.message);
  }
};
const cartList = async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(500).send(`Unauthorized User - Please Login!`)
        }
        const loggedInUser = req.user._id;

        const cartList = await cartModel.find({buyerId:loggedInUser}).populate("itemId", "cropName cropPhoto availability cropType about season quantity")
        .populate("sellerId","firstName lastName email ");
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

    const cartItem = await cartModel.findOne({ _id: itemId, buyerId: loggedInUser });

    if (!cartItem) {
      return res.status(404).send("Item not found in your cart!");
    }

    const item = await Seller.findById(cartItem.itemId);
    if (item) {
      item.quantity += cartItem.quantity;
      await item.save();
    }

    await cartModel.findByIdAndDelete(itemId);

    return res.status(200).json({ message: "Item removed successfully!", data: cartItem });

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

    const { address, quantity } = req.body;

    if (!address) {
      return res.status(400).send('Valid address is required!');
    }

    if (!quantity || quantity <= 0) {
      return res.status(400).send('Quantity must be at least 1!');
    }

    const loggedInUser = req.user._id;
    const item = await Seller.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found!');
    }

    if (!item.sellerId) {
      return res.status(400).send('Item has no associated seller!');
    }

    if (quantity > item.quantity) {
      return res.status(400).send('Requested quantity exceeds available stock!');
    }

    const totalPrice = quantity * item.price;

    const order = new OrderModel({
      sellerId: item.sellerId, 
      buyerId: loggedInUser,
      itemId: item._id,
      quantity,
      totalPrice,
      address,
      status: "Pending",
      orderDate: new Date()
    });

    item.quantity -= quantity;

    await Promise.all([
      order.save(),
      item.save(),
      cartModel.findOneAndDelete({ itemId, buyerId: loggedInUser })
    ]);

    return res.status(201).json({ message: 'Order placed successfully!', data: order });

  } catch (error) {
    return res.status(500).send(`Error while placing order: ${error.message}`);
  }
};

const buyerOrder =  async(req,res)=>{
    try {
        if(!req.user || !req.user._id){
            return res.status(401).send(`Unauthorized User - Please Login!`);
        }
        const loggedInUser = req.user._id;

        const order =  await OrderModel.find({buyerId: loggedInUser})
        .populate("itemId","cropName cropPhoto price cropType season about ")
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
const orderStatus = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send("Unauthorized User -- Please login!");
    }

    const loggedInUser = req.user._id;

    const items = await OrderModel.find({ buyerId: loggedInUser })
      .populate("itemId", "cropName cropPhoto price cropType season")
      .sort({ orderDate: -1 });

    if (!items || items.length === 0) {
      return res.status(200).json({ message: "No orders made till now!", data: [] });
    }

    return res.status(200).json({
      message: "Order history retrieved successfully!",
      count: items.length,
      data: items,
    });

  } catch (error) {
    return res.status(500).send("Error retrieving orders: " + error.message);
  }
};



module.exports = {allListedItems , addToCart , cartList , removeItem , buyItem , buyerOrder,aboutItem , orderStatus}