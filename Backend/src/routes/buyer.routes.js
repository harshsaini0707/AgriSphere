const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const {allListedItems , addToCart, cartList, removeItem } = require("../controllers/buyer.controller");

const buyerRoute = express.Router();

buyerRoute.get("/itemFeed",userProtect,allListedItems);
buyerRoute.post("/addToCart/:itemId",userProtect,addToCart);
buyerRoute.get("/getCartItem",userProtect,cartList);
buyerRoute.delete("/deleteCartItem/:itemId",userProtect,removeItem);

module.exports = buyerRoute
