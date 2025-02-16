const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false 
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
