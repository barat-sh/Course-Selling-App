const express = require('express');
const {sequelize} = require("sequelize")
const mysql = require("mysql2")
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())


// importing database

const db= require("./models")

// importing routes
const usersRoute = require("./routes/Users")
const problemsRoute = require("./routes/Problems")

// using routes
app.use("/user",usersRoute)
app.use("/problems",problemsRoute)

app.get("/admin",(req,res)=>{
    res.json({message:"Welcome admin..."})
})

db.sequelize.sync().then(()=>{
    app.listen(3000,()=>{
        console.log("server Hitting...")
    })
})
