const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const {listCrop , editListedItem , deleteItem, getItem} = require("../controllers/seller.controller");

const sellerRoute =  express.Router();

sellerRoute.post("/listCrop",userProtect,listCrop);
sellerRoute.patch("/editItem/:itemId",userProtect,editListedItem);
sellerRoute.delete("/deleteItem/:itemId",userProtect,deleteItem);
sellerRoute.get("/getItem",userProtect,getItem);


// buy functinality add buyer click on uy buuton it add to seller and also ask for delivery time and status
module.exports = sellerRoute;