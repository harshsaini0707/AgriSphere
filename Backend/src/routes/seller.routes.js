const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const {listCrop , editListedItem , deleteItem, getItem, allOrders, updateOrder} = require("../controllers/seller.controller");

const sellerRoute =  express.Router();

sellerRoute.post("/listCrop",userProtect,listCrop);
sellerRoute.patch("/editItem/:itemId",userProtect,editListedItem);
sellerRoute.delete("/deleteItem/:itemId",userProtect,deleteItem);
sellerRoute.get("/getItem",userProtect,getItem);

sellerRoute.get("/allOrders", userProtect,allOrders); {/*work*/}
sellerRoute.patch("/orderStatus/:orderid",userProtect,updateOrder); {/*work*/}

module.exports = sellerRoute;