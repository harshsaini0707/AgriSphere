const { adminModel } = require("../models/admin.model");
const  cropModel  = require("../models/crop.model");
const Task = require("../models/task.model");
const { User } = require("../models/User.model");
const bcrypt = require("bcrypt")


//User

const profile = async(req,res)=>{
    try {
        
        const loggedInUser = req.user._id;

        const profileData = await User.findById(req.user._id);

        return res.status(200).json({data:profileData})

    } catch (error) {
        return res.status(500).json({message:error.message})  
    }
}
const editProfile = async (req, res) => {
    try {
      const { firstName, lastName, State, Location, age, profilePhoto } = req.body;
      const loggedInUser = req.user;
      
      if (!loggedInUser) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
  
    
      const user = await User.findByIdAndUpdate(
        loggedInUser._id,
        {
          firstName,
          lastName,
          Location,
          State, 
          age,
        },
        { new: true, runValidators: true } 
      );
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({
        message: "Profile Updated Successfully!",
        data: user,
      });
  
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};
const changePassword = async(req,res)=>{
    try {
        const loggedInUser= req.user._id;

        const{newPassword , confirmPassword} = req.body;

        if(newPassword !== confirmPassword){
            return res.status(500).json({message:"Both Given Password Are Not Matching!!"})
        }

        const hashPassword = await bcrypt.hash(newPassword,10);

        const user = await User.findByIdAndUpdate(loggedInUser,{
            password:hashPassword
        });

        return res.status(200).json({message:"Password Changed Successfully!!",
            data:user
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//Crop

const userCropFeed =  async(req,res)=>{
  try {
    const feed = await adminModel.find({});
    if(feed.length == 0 )return res.status(404).send("No Crop Available!!")
    return res.status(200).json({size:feed.length,data:feed});


} catch (error) {
    return res.status(500).send("Error In Crop Feed!!");
}

}


const harvestCrop = async (req, res) => {
  try {
    const plantedCropId = req.params.plantedCropId;
    const loggedInUser = req.user._id;

    
    const crop = await cropModel.findOne({ _id: plantedCropId, userId: loggedInUser });

    if (!crop) return res.status(404).send("Crop Not Found or Unauthorized Access!");

    crop.status = true;
    await crop.save();

    const harvestedCrop = await cropModel
      .findById(plantedCropId)
      .populate("cropId", "cropName cropPhoto duration nutrition optimalConditions  area");

    return res.status(200).json({ message: "Crop Harvested Successfully", data: harvestedCrop });

  } catch (error) {
  
    return res.status(500).send("Error While Harvesting The Crop!!");
  }
};

const aboutCrop = async(req,res)=>{
  try {
    const cropId = req.params.cropId;
    const exists = await adminModel.findById(cropId);
    if(!exists) return res.status(404).send("Crop Not Found!!");

    return res.status(200).json({message:"About Crop",data:exists});
    
  } catch (error) {
    return res.status(500).send("Error While About Crop "+ error.message)
  }
}

const plantedCrop = async(req,res)=>{
  try {
    const loggedInUser = req.user._id;

    const findCrop = await cropModel.find({status:false , userId:loggedInUser}).populate("cropId","cropName cropPhoto about soilType duration state nutrition optimalConditions market waterRequirement area season ");

    if(!findCrop || findCrop.length === 0) return res.status(404).send("No Crop Is Planted!!");

    return res.status(200).json({message:"Planted Crop",size:findCrop.length ,data:findCrop});

  } catch (error) {
    return res.status(500).send("Error While Viewing Planted Crop");
  }
}

const harvestedCrop = async(req,res)=>{
  try {
    const loggedInUser = req.user._id;

    const findCrop = await cropModel.find({status:true , userId:loggedInUser}).populate("cropId","cropName cropPhoto duration season area");

    if(!findCrop || findCrop.length === 0) return res.status(404).send("No Harveted Crop!!");

    return res.status(200).json({message:"Harvested Crop",size:findCrop.length,data:findCrop});

  } catch (error) {
    return res.status(500).send("Error While Viewing Planted Crop");
  }
}
const plantCrop = async(req,res)=>{
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send("User not authenticated");
    }
    const loggedInUser = req.user._id;
    const cropId = req.body.cropId;
    const area = req.body.area;

    const cropExists = await adminModel.findById(cropId);

    if(!cropExists) return res.status(404).send("Crop Not Found!!");

    const addCrop =  new cropModel({
      cropId,
      area:area,
      userId: loggedInUser
    });
    await addCrop.save();

    const populatedCrop = await cropModel.findById(addCrop._id).populate("cropId", "cropName cropPhoto  area duration nutrition optimalConditions");

    return res.status(200).json({message:"Crop  Added Successfully",data:populatedCrop})

    
  } catch (error) {
    return res.status(500).send("Error While Planting The Crop!!")
  }
}

// const seedArea = async(req,res)=>{
// try {
//   if(!req.user){
//     return res.status(401).send("Unauthorized - Login !!")
//   }
//   const cropId = req.params.cropId;
//   const area = req.body.area;

//   const crop = await adminModel.findById(cropId);
//   if(!crop) return res.status(404).send("Crop Not Found!!");
  
//   const areaCrop = await cropModel({
//     area:area
//   })

//   await areaCrop.save();
//   return res.status(200).json({message:"Crop Area Added Successfully",data:area})
// } catch (error) {
//   return res.status(500).send(error.message)
// }
// }


//Task
const addTask = async(req,res)=>{
  try {
    const loggedInUser = req.user;
    if(!loggedInUser || !loggedInUser._id){
      return res.status(401).json({message:"Unauthorized User"})
    }

    const {text} = req.body;
    if(!text) return res.status(500).send("Please Add Task!!")
    const task = new Task({
      text:text,
      userId:loggedInUser._id
    })
    await task.save();

    if(!task) return res.status(404).send("Error While Creating Task!!")
    else return res.status(200).json({message:"Task Added Successfully!!",data:task});

  } catch (error) {
    return res.status(500).send(error.message)
  }
};

const findTask = async(req,res)=>{
  try {
    
    if(!req.user || !req.user._id){
      return res.status(401).send(("UnAuthorized User!!"));
    }
    const task = await Task.find({userId:req.user._id});

    if(!task || task.length == 0) return res.status(404).send("No Task Created!!");
    else return res.status(200).json({message:"Task",lenght:task.length,data:task})
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
const editTask = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized User!" });
    }

    const loggedInUser = req.user._id;
    const taskId = req.params.taskId;
    const { text } = req.body; 

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "Task text cannot be empty!" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "No Task With Given ID Found!" });
    }

    if (task.userId.toString() !== loggedInUser.toString()) {
      return res.status(403).json({ message: "Unauthorized to edit this task!" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { text: text.trim() }, 
      { new: true } 
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found after update!" });
    }

    return res.status(200).json({ message: "Task Successfully Edited!", data: updatedTask });

  } catch (error) {
    return res.status(500).json({ message: "Error While Editing Task", error: error.message });
  }
};

const completeTask = async(req,res)=>{
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const loggedInUser = req.user._id;

    const taskId = req.params.taskId;

    if(!taskId)return res.status(404).send("Unable to get taskId");
    const exists = await Task.findById(taskId);

    if(!exists) return res.status(404).json({message:"Task not found!!"});

    if (exists.userId.toString() !== loggedInUser.toString()) {
      return res.status(403).json({ message: "Unauthorized to complete this task" });
    }
    
    exists.status=true; 

    await exists.save();

    return res.status(200).json({message:"Task Complete!!",data:exists})

    
  } catch (error) {
    return res.status(500).send(error.message)
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);

    if (!task) return res.status(404).json({ message: "No Task Found!" });

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized to delete this task!" });
    }

    task.deleted = true;
    await task.save();

    return res.status(200).json({ message: "Task Marked as Deleted!",data:task });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//Data
const getData = async(req,res)=>{
  try {
    if(!req.user || !req.user._id){
      return res.status(401).send("UserUnauthorized !! - Login Please !!");
    }
    const loggedInUser  = req.user._id;
    const cropData = await cropModel.find({userId:loggedInUser , status:true})
    
    if(!cropData) return res.status(404).send("No Crop Found!!");

    const cropData2 = await cropModel.find({userId:loggedInUser , status:false});
    if(!cropData2) return res.status(404).send("No Crop Found!!");

    return res.status(200).json({plantedCrop:cropData2.length , harvestedCrop:cropData.length});

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


module.exports = {profile,editProfile,changePassword,userCropFeed,plantCrop,harvestCrop,aboutCrop,harvestedCrop,plantedCrop,addTask,completeTask,deleteTask,editTask,findTask,getData};