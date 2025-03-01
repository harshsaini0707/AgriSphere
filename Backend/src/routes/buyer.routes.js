const express = require("express");
const userProtect = require("../middlewares/userProtect.middleware");
const { allListedItems } = require("../controllers/seller.controller");
const sellerRoute = express.Router();

sellerRoute.get("/itemFeed",userProtect,allListedItems);
