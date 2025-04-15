const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const {allListedItems , addToCart, cartList, removeItem, buyItem, buyerOrder, aboutItem  } = require("../controllers/buyer.controller");

const buyerRoute = express.Router();

buyerRoute.get("/itemFeed",userProtect,allListedItems);
buyerRoute.post("/addToCart/:itemId",userProtect,addToCart);
buyerRoute.get("/getCartItem",userProtect,cartList);
buyerRoute.delete("/deleteCartItem/:itemId",userProtect,removeItem);

buyerRoute.post("/buyItem/:ItemId",userProtect,buyItem);
buyerRoute.get("/placedOrdered",userProtect,buyerOrder);

buyerRoute.get("/aboutProduct/:ItemId",userProtect,aboutItem);


// buyerRoute.get("/orderStatus",userProtect , orderStatus );
module.exports = buyerRoute