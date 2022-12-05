const mongoose = require("mongoose");

const contectShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  subject: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  email: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  message: {
    type: String,
    required: [true, "Please Enter product Description"],
  },


  //     brand: {
  //       type: String,
  //       required: true,
  //     },
  //     reviews: [
  //       {
  //         user: {
  //           type: mongoose.Schema.ObjectId,
  //           ref: "User",
  //           required: true,
  //         },
  //         rating: {
  //           type: Number,
  //           required: true,
  //         },
  //         comment: {
  //           type: String,
  //           required: true,
  //         },
  //         name: {
  //           type: String,
  //           required: true,
  //         },
  //         profileUrl: {
  //           type: String,
  //           required: true,
  //         },
  //         time: {
  //           type: String,
  //           required: true,
  //         },
  //       },
  //     ],
  //     // product ta je uplode korse ta callet korar jonno
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
 
});

const contectModal = new mongoose.model("Contect", contectShema);

module.exports = contectModal;
