const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors({
      origin: "http://localhost:3000"
}))
// const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload");
// middelwar 
// app.use(cookieParser())
app.use(express.json())

app.use(fileUpload());
app.use(express.static("public"));

// all router
const userRouter = require("./router/user")
const courseRouter = require("./router/courses")
const orderRouter = require("./router/order")
app.use("/api/v1/user", userRouter)
app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/order", orderRouter)


app.use('/' , (req , res)=>{
      res.send("hellw world")
})

// app.use(errorHandeler)


module.exports = app