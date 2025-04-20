const mongoose = require("mongoose");
const validator = require("validator");

const adminSchema = new mongoose.Schema({

    cropName:{
        type:String,
        required:true
    },
    cropPhoto:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Type")
            }
        },
        required:true
    },
    about:{
        type:String,
        required:true
    },
    state:{
        type:[String],
        default:[],
        required:true
    },
    soilType:{
        type:[String],
        required:true
    },
    seedRequired:{
        type:Number,
        required:true
    },
     duration:{
        type:Number,
        required:true
    },
    nutrition:{
        type:[String],
        default:[],
        required:true
    },
    optimalConditions: {
        temperature: {
            type: String,
        },
        humidity: {
            type: String,
        },
        rainfall: {
            type: String,
        }
        },
        market:{
            currentPrice:{
                type:Number
            },
            demand:{
            type:String
           }
        },

        waterRequirement:{
            type:[String],
            default:[]
        },
        market:{
            currentPrice:{
                type:Number,
            },
            demand:{
                type:String
            }
        },
        season:{
            planting:{
                type:[String],
                default:[],
                required:true
            },
            harvesting:{
                type:String,
                required:true
            }
        }

  
},{timestamps:true});

adminSchema.index({cropName:1});

const adminModel = mongoose.model("adminModel",adminSchema);
module.exports = {adminModel};