const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller", 
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"]
    },
    price: {
        type: Number,
        required: true
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
   
    totalPrice: {
        type: Number,
        required: true
    },
    buyStatus: {
        type: Boolean,
        default: false
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
    },
    orderDate: {
        type: Date,
        
    },
    deliveryDate: { 
        type: Date
    },
    address: {
        type: String
    }
},{timestamps:true});

const cartModel = mongoose.model("cartModel",cartSchema);
module.exports = {cartModel}
