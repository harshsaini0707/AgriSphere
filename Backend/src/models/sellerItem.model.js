const mongoose = require("mongoose");
const validator = require("validator");

const cropSchema = new mongoose.Schema({
  cropName: {
    type: String,
    required: [true, "Crop name is required"]
  },
  cropPhoto: {
    type: String,
    required:[true , "Image Required"]
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  availability: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  cropType: {
    type: [String],
    required: [true, "Crop type(s) required"]
  },
  season: {
    type: [String],
    required: [true, "Season(s) required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"]
  },
  about: {
    type: String
  },
  demand: {
    type: String
  }
}, { timestamps: true });


cropSchema.index({ cropName: 1 });
cropSchema.index({ cropType: 1 });
cropSchema.index({ season: 1 });

const Seller = mongoose.model("Seller", cropSchema);

module.exports = { Seller };
