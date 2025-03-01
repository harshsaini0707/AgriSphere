const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    buyerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,  
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered","Cancelled"],
        default: "Pending"
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    address:{
        type:String,
        required:true
    }

},{timestamps:true});

const OrderModel = mongoose.model("OrderModel",orderSchema);

module.exports= {OrderModel}