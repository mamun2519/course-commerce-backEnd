const express = require("express");
const {
  userRegister,
  userLogin,
  getAllUser,
  getAllAdvaiser,
  getAllOwner,
  getSingleUser,
  deleteUser,
  createAdmin,
  removeAdmin,
  cheackAdmin,
} = require("../controler/userControler");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/user", getAllUser);
router.get("/adviser", getAllAdvaiser);
router.get("/owner", getAllOwner);
router.get("/single/:id", getSingleUser);
router.delete("/delete/:id", deleteUser);
router.put("/admin/:email", createAdmin);
router.put("/remove/:email", removeAdmin);
router.get("/chackAdmin/:email", cheackAdmin);
module.exports = router;
