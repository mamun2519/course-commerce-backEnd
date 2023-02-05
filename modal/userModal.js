const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userShema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please Enter Your Name"],
      
          },
          email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
          },
          status:{
            type: String,
            default: "NOT PAID"

          },
          adviserUserName:{
            type: String,
            default: "No Adviser"

          },
      //     avatar: {
      //       public_id: {
      //         type: String,
      //         required: true,
      //       },
      //       url: {
      //         type: String,
      //         required: true,
      //       },
      //     },
          role: {
            type: String,
            required: true
            // default: "user",
          },
         
          
})

userShema.methods.getJWTtoken = function (){
  return jwt.sign({ email: this.email }, process.env.SCRECT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

const userModel = new mongoose.model('User' , userShema)


module.exports = userModel