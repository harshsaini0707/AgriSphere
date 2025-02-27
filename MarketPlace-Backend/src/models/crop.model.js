const mongoose = require("mongoose");
const validator = require("validator")

const cropSchema  = new mongoose.Schema({
    cropName:{
        type:String,
        required:true
    },
    cropPhoto:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error(`Invalid Image Type`)
            }
        }
    },
    sellerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"adminModel"
    },
    availability:{
        type:Boolean,
        default:true
    },
    price:{
        type:Number,
        required:true
    },
   cropType:{
      type:[String],
      required:true
    },
    season:{
        type:[String],
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    about:{
        type:String
    },
    demand:String

},{timestamps:true});

cropSchema.index({cropName:1});
cropSchema.index({cropType:1});
cropSchema.index({season:1});

const CropModel = mongoose.model("CropModel",cropSchema);

module.exports = {CropModel};