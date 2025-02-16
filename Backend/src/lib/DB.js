const mongoose = require("mongoose");
require("dotenv").config();

const MONOGO_CONNECT = async() =>{
    mongoose.connect(process.env.MONGO_URL)
}

module.exports={MONOGO_CONNECT}