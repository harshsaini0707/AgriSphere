const express =require("express");
const { addCrop, editCrop, deleteCrop, feed, adminLogin, adminLogout, aboutCrop } = require("../controllers/adminRights.controllers");
const adminProtect = require("../middlewares/adminProtect.middleware");
const adminRoute = express.Router();


adminRoute.post("/admin/login",adminLogin)
adminRoute.post("/admin/logout",adminLogout)
adminRoute.post("/add/crop",adminProtect,addCrop);
adminRoute.get("/about/:cropId",adminProtect,aboutCrop);
adminRoute.patch("/edit/crop/:cropId",adminProtect,editCrop);
adminRoute.delete("/delete/:cropId",adminProtect,deleteCrop);
adminRoute.get("/crop/feed",adminProtect,feed);


module.exports = adminRoute;