const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const listCrop = require("../controllers/seller.controller");

const sellerRoute =  express.Router();

sellerRoute.post("/listCrop",userProtect,listCrop);




module.exports = sellerRoute;