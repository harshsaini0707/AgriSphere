const express = require("express");
const { profile, editProfile, changePassword, userCropFeed, plantCrop, harvestCrop, aboutCrop, plantedCrop, harvestedCrop, addTask, completeTask, deleteTask, editTask, findTask, getData } = require("../controllers/user.controller");
const userRouter = express.Router();
const userProtect = require("../middlewares/userProtect.middleware");

//User
userRouter.get("/profile",userProtect,profile);
userRouter.patch("/edit/profile",userProtect,editProfile);
userRouter.patch("/change/password",userProtect,changePassword);

//Crop
userRouter.get("/userFeed",userProtect,userCropFeed);
userRouter.post("/plantCrop/:cropId",userProtect,plantCrop);
userRouter.patch("/hearvestCrop/:plantedCropId",userProtect,harvestCrop);
userRouter.get("/aboutCrop/:cropId",userProtect,aboutCrop);
userRouter.get("/plantedCrop",userProtect,plantedCrop);
userRouter.get("/harvestCrop",userProtect,harvestedCrop);

//Task
userRouter.post("/addTask",userProtect,addTask); 
userRouter.patch("/complete/:taskId",userProtect,completeTask) 
userRouter.delete("/delete/:taskId",userProtect,deleteTask)
userRouter.patch("/editTask/:taskId",userProtect,editTask) 
userRouter.get("/tasks",userProtect,findTask) 

//Data
userRouter.get("/homeData",userProtect,getData)
module.exports= userRouter
