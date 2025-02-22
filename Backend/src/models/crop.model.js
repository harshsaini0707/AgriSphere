const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  cropId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"adminModel",
    required:true
  } ,
  userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"User",
   required:true 
  },
  status:{
    type:Boolean,
    default:false,
    required:true
  },
  plantedAt:{
    type:Date,
    default:Date.now,

  },
  area:{
    type:Number,
    required:true
  }
},{timestamps:true});


const cropModel = mongoose.model("cropModel",cropSchema);
module.exports = cropModel;