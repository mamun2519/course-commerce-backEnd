const express = require("express");
const { createCourse } = require("../controler/coursesControler");

const router = express.Router();

router.post("/course" , createCourse)

module.exports = router