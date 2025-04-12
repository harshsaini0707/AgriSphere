const mongoose = require("mongoose");

const paymentSchema  =  new mongoose.Schema({

    orderId:{
        type:String,
        required:true
    },
    paymentId:String,
    userId:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    receipt:{
        type:String,
        required:true
    },
    notes:{
        firstName:String,
        lastName : String,
        email:String,
    },


},{timestamps:true})

const paymentModel = mongoose.model("paymentModel", paymentSchema);

module.exports = paymentModel