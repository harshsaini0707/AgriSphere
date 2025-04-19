const validator = require("validator");

const ValidateData = (req)=>{
    const {firstName , lastName , email , password , Location, State } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name Required!!")
    }
    if(!email){
        throw new Error("Email Required!!")
    }
    if(!State || !Location){
        throw new Error("Location Required")
    }
        if(!validator.isEmail(email)){
            throw new Error("Email Type Invalid!!")
        }
   

    if(!password){
      throw new Error("Password  Required!!")
    }
    
}

module.exports = {ValidateData}